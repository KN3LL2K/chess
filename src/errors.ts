export class ChessError extends Error {
  public code: string
  constructor(m: string, code: string) {
    super(m);
    this.code = code

    Object.setPrototypeOf(this, CellRetrievalError.prototype);
  }
}


export type CellRetrievalErrorCode = 'invalid_column' | 'invalid_row' | 'invalid_position'

export class CellRetrievalError extends ChessError {
  constructor(code: CellRetrievalErrorCode, pos: {row, column}) {
    super(`Failed to retrieve cell: ${pos}`, code);

    Object.setPrototypeOf(this, CellRetrievalError.prototype);
  }
}