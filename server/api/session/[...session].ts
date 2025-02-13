import sessions from "~/server/sessions"
export default defineEventHandler((event) => {
  const id = event.context.params?.session
  const existingSession = sessions.find(s => s.id === id)
  if (existingSession) {
    return existingSession
  }else if(id?.match(/^[a-zA-Z0-9]{6}$/)){
    const newSession = { id, cardsVisible: false, players: [] }
    sessions.push(newSession)
    return newSession
  }
  else{
    setResponseStatus(event, 404)
    return 'Session not found'
  }
})