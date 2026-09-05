import type { MeResponse, UserRow } from '../../../src/api/types'
import type { UserCharacter } from '../../../src/data/characters/types'
import { refreshStamina } from '../../../src/features/stamina/stamina'
import type { Context } from '../context'

type UserTableRow = Omit<
  UserRow,
  'cleared_stage_ids' | 'tutorial_steps' | 'stamina_recovering_seconds' | 'stamina_recovering_seconds_max'
> & {
  cleared_stage_ids: string
  tutorial_steps: string
}

interface CharacterTableRow {
  master_id: string
  level: number
  exp: number
  limit_break: number
  dupe: number
  selected_skill_id: string
  skill_levels: string
}

interface PartyTableRow {
  slot: number
  master_ids: string
}

const PARTY_SLOTS = [1, 2, 3, 4]

// ログイン用。nameはユーザー名かid
export async function findCredentials(db: D1Database, name: string) {
  return db
    .prepare('SELECT id, password_hash, password_salt FROM users WHERE username = ? OR id = ?')
    .bind(name, name)
    .first<{ id: string; password_hash: string; password_salt: string }>()
}

// 新規登録
export async function createUser(
  db: D1Database,
  user: { id: string; name: string; passwordHash: string; passwordSalt: string },
  now: number,
): Promise<void> {
  await db.batch([
    db
      .prepare(
        `INSERT INTO users (id, username, password_hash, password_salt, stamina_updated_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(user.id, user.name, user.passwordHash, user.passwordSalt, now),
    ...PARTY_SLOTS.map((slot) =>
      db.prepare('INSERT INTO user_parties (user_id, slot) VALUES (?, ?)').bind(user.id, slot),
    ),
  ])
}

export async function loadMe({ db, userId, now }: Context): Promise<MeResponse> {
  const user = await db
    .prepare('SELECT * FROM users WHERE id = ?')
    .bind(userId)
    .first<UserTableRow>()
  if (!user) throw new Error(`ユーザーが見つからない: ${userId}`)

  const characters = await db
    .prepare('SELECT * FROM user_characters WHERE user_id = ?')
    .bind(userId)
    .all<CharacterTableRow>()
  const parties = await db
    .prepare('SELECT slot, master_ids FROM user_parties WHERE user_id = ?')
    .bind(userId)
    .all<PartyTableRow>()

  const party: Record<number, string[]> = {}
  for (const slot of PARTY_SLOTS) party[slot] = []
  for (const row of parties.results) party[row.slot] = JSON.parse(row.master_ids)

  return {
    // 現在時刻まで進めてから返す。読むだけなら D1 には書かない
    user: refreshStamina(
      {
        ...user,
        cleared_stage_ids: JSON.parse(user.cleared_stage_ids),
        tutorial_steps: JSON.parse(user.tutorial_steps),
        stamina_recovering_seconds: 0,
        stamina_recovering_seconds_max: 0,
      },
      now,
    ),
    characters: characters.results.map((r) => ({
      masterId: r.master_id,
      level: r.level,
      exp: r.exp,
      limitBreak: r.limit_break,
      dupe: r.dupe,
      selectedSkillId: r.selected_skill_id,
      skillLevels: JSON.parse(r.skill_levels),
    })),
    party,
  }
}

const characterKey = (c: UserCharacter) =>
  JSON.stringify([c.level, c.exp, c.limitBreak, c.dupe, c.selectedSkillId, c.skillLevels])

// before と比べて変わった行だけ書く
export async function saveMe(
  { db }: Context,
  before: MeResponse,
  after: MeResponse,
): Promise<void> {
  const u = after.user
  const statements: D1PreparedStatement[] = [
    db
      .prepare(
        `UPDATE users SET
           username = ?, "rank" = ?, total_exp = ?, exp_in_rank = ?, exp_to_next = ?,
           stamina = ?, stamina_max = ?, stamina_updated_at = ?,
           currency = ?, gems = ?, pity = ?,
           chapter = ?, current_chapter = ?, cleared_stage_ids = ?, tutorial_steps = ?
         WHERE id = ?`,
      )
      .bind(
        u.username,
        u.rank,
        u.total_exp,
        u.exp_in_rank,
        u.exp_to_next,
        u.stamina,
        u.stamina_max,
        u.stamina_updated_at,
        u.currency,
        u.gems,
        u.pity,
        u.chapter,
        u.current_chapter,
        JSON.stringify(u.cleared_stage_ids),
        JSON.stringify(u.tutorial_steps),
        u.id,
      ),
  ]

  const beforeCharacters = new Map(before.characters.map((c) => [c.masterId, characterKey(c)]))
  for (const c of after.characters) {
    if (beforeCharacters.get(c.masterId) === characterKey(c)) continue
    statements.push(
      db
        .prepare(
          `INSERT INTO user_characters
             (user_id, master_id, level, exp, limit_break, dupe, selected_skill_id, skill_levels)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(user_id, master_id) DO UPDATE SET
             level = excluded.level, exp = excluded.exp, limit_break = excluded.limit_break,
             dupe = excluded.dupe, selected_skill_id = excluded.selected_skill_id,
             skill_levels = excluded.skill_levels`,
        )
        .bind(
          u.id,
          c.masterId,
          c.level,
          c.exp,
          c.limitBreak,
          c.dupe,
          c.selectedSkillId,
          JSON.stringify(c.skillLevels),
        ),
    )
  }

  for (const slot of PARTY_SLOTS) {
    const next = JSON.stringify(after.party[slot] ?? [])
    if (JSON.stringify(before.party[slot] ?? []) === next) continue
    statements.push(
      db
        .prepare('UPDATE user_parties SET master_ids = ? WHERE user_id = ? AND slot = ?')
        .bind(next, u.id, slot),
    )
  }

  await db.batch(statements)
}
