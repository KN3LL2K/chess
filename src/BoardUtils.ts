import * as _ from 'lodash'
import { CellPosition } from './Board';

const BoardUtils = {
  columnName: (columnNumber: number) : string => {
    let dividend = columnNumber
    let columnName = ''
    let modulo = 0
    while (dividend > 0) {
      modulo = (dividend - 1) % 26
      columnName = String.fromCharCode(65 + modulo) + columnName
      dividend = Math.floor((dividend - modulo) / 26)
    }
    return columnName
  },
  keyToCellPos: (key: string) : { row: number, column: number } => {
    const KeyRegex = /^([A-Z]*)?(\d*)?$/
    const match = KeyRegex.exec(key)
    if (match.length === 3) {
      const alpha = match[1]
      const digit = match[2]
      let column = 0
      _.each(alpha, (c, i) => {
        column *= 26
        const charCode = alpha.charCodeAt(i)
        column += (charCode - 65 + 1)
      })
      return { row: Number(digit) - 1, column: column - 1 }
    } else {
      return { row: -1, column: -1 }
    }
  },
  computePosition: (pos: CellPosition | string) : CellPosition => {
    return typeof pos === 'string' ?
      BoardUtils.keyToCellPos(pos) : 
      pos as CellPosition
  },
  checkPositionInBounds: (position: CellPosition | string) : boolean => {
    const computedPos = BoardUtils.computePosition(position)
    const { row, column } = computedPos
    return (row >= 0 && row < 8) && (column >= 0 && column < 8)
  }
}

export default BoardUtils