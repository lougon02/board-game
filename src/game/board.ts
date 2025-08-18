

export type Player = "B" | "W" | null;

export class GameBoard {
  readonly size: number;
  private grid: Array<Array<Player>>;

  constructor(size: number = 19) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
  }

  getCell(x: number, y: number): Player {
    return this.grid[x][y];
  }

  placePiece(x: number, y: number, player: Player): boolean {
    if (this.grid[x][y] === null) {
      this.grid[x][y] = player;
      return true;
    }
    return false;
  }

  getGrid(): Array<Array<Player>> {
    return this.grid;
  }

  getSize(): number {
    return this.size;
  }
}