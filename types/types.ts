export type Player = {
    id: string,
    name: string,
    card: string | null,
    peers: string[],
    observer: boolean
  }
  
  export type Session = {
    id: string,
    cardsVisible: boolean,
    players: Player[]
  }