import { nanoid } from 'nanoid'
import { Peer, Message} from 'crossws'

type Player = {
  id: string,
  name: string,
  card: string | null,
}

type Session = {
  id: string,
  cardsVisible: boolean,
  players: Player[]
}

const sessions: Session[] = []

function findSessionById(sessionId: string): Session | undefined {
  return sessions.find(session => session.id === sessionId)
}

function addPlayerToSession(session: Session, playerName: string, peer: Peer) {
  const player = { id: peer.id, name: playerName, card: null }
  session.players.push(player)
  peer.subscribe(session.id)
  updateClients(peer)
}

function removePlayerFromSession(playerId: string, session: Session) {
  session.players = session.players.filter(player => player.id !== playerId)
}

function createSession(): string {
  let sessionId = ''
  do {
    sessionId = nanoid(6)
  } while (findSessionById(sessionId)?.players.length || sessionId.includes('-') || sessionId.includes('_'))

  const session = { id: sessionId, cardsVisible: false, players: [] }
  sessions.push(session)
  return sessionId
}

function updateClients(peer: Peer) {
  const session = sessions.find(session => session.players.some(player => player.id === peer.id))
  if (!session) {
    console.error('Session not found when updating clients')
    return
  }
  peer.publish(session.id,JSON.stringify(session))
  peer.send(JSON.stringify(session))
}

export default defineWebSocketHandler({
  open(peer: Peer) {
    const params = new URLSearchParams(peer.request?.url?.split('?')[1])
    const playerName = params.get('name') || 'Unknown'
    let sessionid = params.get('session')
    if (!sessionid || !findSessionById(sessionid)) {
      sessionid = createSession()
    }
    const session = findSessionById(sessionid)!
    addPlayerToSession(session, playerName, peer)
  },
  close(peer: Peer) {
    const session = sessions.find(session => session.players.some(player => player.id === peer.id))
    if(!session){
      console.error('Session not found when closing connection')
      return
    }
    removePlayerFromSession(peer.id, session)
    peer.publish(session.id,JSON.stringify(session))
  },
  message(peer: Peer, message: Message) {
    const messageData = message.json() as { event: string, value: string }
    const event = messageData.event
    if(event === 'vote'){
      const session = sessions.find(session => session.players.some(player => player.id === peer.id))
      const player = session!.players.find(player => player.id === peer.id)
      player!.card = messageData.value
      updateClients(peer)
    }
  }
})