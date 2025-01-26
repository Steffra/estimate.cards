import sessions from "~/server/sessions"
export default defineEventHandler((event) => {
  const existingSession = sessions.find(s => s.id === event.context.params?.session)
  if (existingSession) {
    return existingSession
  }else{
    setResponseStatus(event, 404)
    return 'Session not found'
  }
})