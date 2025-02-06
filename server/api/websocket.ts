import { nanoid } from 'nanoid'
import { Peer, Message} from 'crossws'
import { type Session } from '../../types/types'
import sessions from "~/server/sessions"

function findSessionById(sessionId: string): Session | undefined {
  return sessions.find(session => session.id === sessionId)
}

function addPlayerToSession(session: Session, id: string, playerName: string, peer: Peer, observer = false) {
  const player = { id, peer: peer.id, name: playerName, card: null, observer }
  session.players.push(player)
  peer.subscribe(session.id)
  updateClients(peer)
}

function removePlayerFromSession(peer: Peer, session: Session) {
  session.players = session.players.filter(player => player.peer !== peer.id)
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
    console.log('Player connected', id, playerName)
    if(!id || id =='null'){
      peer.close(0,'Player id not found')
      return
    }
    let sessionid = params.get('session')
    if (!sessionid || !findSessionById(sessionid)) {
      peer.close(0,'Session not found')
      return
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
    const session = sessions.find(session => session.players.some(player => player.peer === peer.id))
    if(!session){
      return
    }
    const player = session.players.find(player => player.peer === peer.id)
    if(event === 'vote'){
      const player = session!.players.find(player => player.peer === peer.id)
      if(player!.card == messageData.value){
        player!.card = null
      }else{
        player!.card = messageData.value
      }
      updateClients(peer)
    }
    if(event === 'show'){
      session.cardsVisible = true
      updateClients(peer)
    }
    if(event === 'reset'){
      session.cardsVisible = false
      session.players.forEach(player => player.card = null)
      updateClients(peer)
    }
    if(event === 'toggleObserverMode'){
        if(!player){  
          return
        }
        player.observer = !player.observer
        player.card = null
        updateClients(peer)
      }
  }
})