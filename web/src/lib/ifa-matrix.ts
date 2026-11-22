// Classroom positions only: never a ritual sign mapping or liturgical ranking.
export function indexCode(index: number): string {
  if (!Number.isInteger(index) || index < 0 || index > 15) {
    throw new RangeError('Index must be an integer from 0 to 15');
  }
  return index.toString(2).padStart(4, '0');
}

export function pairing(row: number, column: number) {
  const rowCode = indexCode(row);
  const columnCode = indexCode(column);
  return { row, column, number: row * 16 + column + 1, rowCode, columnCode };
}

export function movedIndex(index: number, key: string, control = false): number {
  if (!Number.isInteger(index) || index < 0 || index > 255) {
    throw new RangeError('Pair index must be an integer from 0 to 255');
  }
  const row = Math.floor(index / 16), column = index % 16;
  switch (key) {
    case 'ArrowLeft': return row * 16 + Math.max(0, column - 1);
    case 'ArrowRight': return row * 16 + Math.min(15, column + 1);
    case 'ArrowUp': return Math.max(0, row - 1) * 16 + column;
    case 'ArrowDown': return Math.min(15, row + 1) * 16 + column;
    case 'Home': return control ? 0 : row * 16;
    case 'End': return control ? 255 : row * 16 + 15;
    default: return index;
  }
}
