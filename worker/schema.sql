-- D1 のスキーマ
CREATE TABLE IF NOT EXISTS users (
  id                             TEXT    PRIMARY KEY,
  username                       TEXT    NOT NULL UNIQUE,
  password_hash                  TEXT    NOT NULL,
  password_salt                  TEXT    NOT NULL,
  rank                           INTEGER NOT NULL DEFAULT 1,
  total_exp                      INTEGER NOT NULL DEFAULT 0,
  exp_in_rank                    INTEGER NOT NULL DEFAULT 0,
  exp_to_next                    INTEGER NOT NULL DEFAULT 100,
  stamina                        INTEGER NOT NULL DEFAULT 50,
  stamina_updated_at             INTEGER NOT NULL DEFAULT 0,
  stamina_max                    INTEGER NOT NULL DEFAULT 50,
  currency                       INTEGER NOT NULL DEFAULT 0,
  gems                           INTEGER NOT NULL DEFAULT 3000,
  pity                           INTEGER NOT NULL DEFAULT 0,
  chapter                        INTEGER NOT NULL DEFAULT 1,
  current_chapter                INTEGER NOT NULL DEFAULT 1,
  cleared_stage_ids              TEXT    NOT NULL DEFAULT '[]',
  tutorial_steps                 TEXT    NOT NULL DEFAULT '[]'
);

-- 所持キャラ
CREATE TABLE IF NOT EXISTS user_characters (
  user_id           TEXT    NOT NULL,
  master_id         TEXT    NOT NULL,
  level             INTEGER NOT NULL DEFAULT 1,
  exp               INTEGER NOT NULL DEFAULT 0,
  limit_break       INTEGER NOT NULL DEFAULT 0,
  dupe              INTEGER NOT NULL DEFAULT 0,
  selected_skill_id TEXT    NOT NULL,
  skill_levels      TEXT    NOT NULL DEFAULT '{}',
  PRIMARY KEY (user_id, master_id)
);

-- 編成
CREATE TABLE IF NOT EXISTS user_parties (
  user_id    TEXT    NOT NULL,
  slot       INTEGER NOT NULL,
  master_ids TEXT    NOT NULL DEFAULT '[]',
  PRIMARY KEY (user_id, slot)
);

-- ログインセッション
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT    PRIMARY KEY,
  user_id    TEXT    NOT NULL,
  expires_at INTEGER NOT NULL
);
