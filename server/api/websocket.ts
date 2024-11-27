import { nanoid } from 'nanoid'
import { Peer, Message} from 'crossws'
import { type Session } from '../../types/types'


const sessions: Session[] = []

function findSessionById(sessionId: string): Session | undefined {
  return sessions.find(session => session.id === sessionId)
}

function addPlayerToSession(session: Session, id: string, playerName: string, peer: Peer) {
  const player = { id, peer: peer.id, name: playerName, card: null }
  session.players.push(player)
  peer.subscribe(session.id)
  updateClients(peer)
}

function removePlayerFromSession(peer: Peer, session: Session) {
  session.players = session.players.filter(player => player.peer !== peer.id)
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
  const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
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
    const id = params.get('id')
    let sessionid = params.get('session')
    if (!sessionid || !findSessionById(sessionid)) {
      sessionid = createSession()
    }
    const session = findSessionById(sessionid)!
    addPlayerToSession(session, id!, playerName, peer)
  },
  close(peer: Peer) {
    const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
    if(!session){
      console.error('Session not found when closing connection')
      return
    }
    removePlayerFromSession(peer, session)
    peer.publish(session.id,JSON.stringify(session))
  },
  message(peer: Peer, message: Message) {
    const messageData = message.json() as { event: string, value: string }
    const event = messageData.event
    if(event === 'vote'){
      const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
      const player = session!.players.find(player => player.id === peer.id)
      if(player!.card ==messageData.value){
        player!.card = null
      }else{
        player!.card = messageData.value
      }
      updateClients(peer)
    }
    if(event === 'show'){
      const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
      session!.cardsVisible = true
      updateClients(peer)
    }
    if(event === 'reset'){
      const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
      session!.cardsVisible = false
      session!.players.forEach(player => player.card = null)
      updateClients(peer)
    }
  }
})