export type Player = {
    id: string,
    name: string,
    card: string | null,
    peer: string,
    observer: boolean
  }
  
  export type Session = {
    id: string,
    cardsVisible: boolean,
    players: Player[]
  }