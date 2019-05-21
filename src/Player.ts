
export type PlayerColor = 'white' | 'black'

export class Player {
  color: PlayerColor

  constructor(color: PlayerColor) {
    this.color = color
  }

}