import {table as makeTable} from 'table'
import * as _ from 'lodash'

import { Board } from './Board'
import { Chess } from './Chess'

const chessGame = new Chess()

const chessBoard = chessGame.gameBoard

chessBoard.initPieces()

const getCellKeys = (board: Board) : Array<Array<string>> => {
  return _.map(chessBoard.getCells(), rows =>
    _.map(rows, cell => cell.key))
}

const getCellPieces = (board: Board) : Array<Array<string>> => {
  
  return _.map(chessBoard.getCells(), rows =>
    _.map(rows, cell => cell.piece ? `${cell.piece.color[0]} ${cell.piece.type}` : ' '))
}

const getPieceMoves = (board: Board, pos: string) : Array<Array<string>> => {
  
  return _.map(chessBoard.getCells(), rows =>
    _.map(rows, cell => cell.key === pos ? 'x' : _.indexOf(pieceMoves, cell.key) > -1 ? 1 : ' '))
}

console.log(makeTable(getCellKeys(chessBoard)))

const testPiece = 'D1'
chessGame.movePiece('C2', 'C3')
const pieceMoves = chessGame.getMovesForPiece(testPiece, chessGame.players[0])
// chessGame.movePiece('D2', 'D3')
console.log(pieceMoves)

console.log(makeTable(getCellPieces(chessBoard)))
console.log(makeTable(getPieceMoves(chessBoard, testPiece)))
// console.log(makeTable(getCellPieces(chessBoard)))