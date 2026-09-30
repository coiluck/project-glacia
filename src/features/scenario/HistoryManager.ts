/** capacityを上限とする履歴スタック。古いものから捨てる。中身のクローンは呼び出し側の責務。 */
export class HistoryManager<T> {
  private readonly stack: T[] = [];
  private readonly capacity: number;

  constructor(capacity: number = 50) {
    this.capacity = capacity;
  }

  push(entry: T): void {
    this.stack.push(entry);
    if (this.stack.length > this.capacity) this.stack.shift();
  }

  pop(): T | null {
    return this.stack.pop() ?? null;
  }

  /** 古い順の全履歴。 */
  list(): readonly T[] {
    return this.stack;
  }

  clear(): void {
    this.stack.length = 0;
  }

  get size(): number {
    return this.stack.length;
  }
}
