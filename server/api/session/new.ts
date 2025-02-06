import sessions from "~/server/sessions"
import { nanoid } from 'nanoid'
export default defineEventHandler(() => {

  let sessionId = ''
    do {
      sessionId = nanoid(6)
    } while (sessionId.includes('-') || sessionId.includes('_') || sessions.find(session => session.id === sessionId))
  
    const session = { id: sessionId, cardsVisible: false, players: [] }
    sessions.push(session)
    return {'id': sessionId}
})