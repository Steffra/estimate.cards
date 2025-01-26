import { type Session } from '../types/types'
import { nanoid } from 'nanoid'

export function useSocket() {
    if (typeof window === 'undefined') {
        return
      }
      const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
      const sessionid = window.location.pathname.split('/').pop()
      const name = window.sessionStorage.getItem('name')
      fetch(`/api/session/${sessionid}`)
      .then(response => {
        if (!response.ok) {
          window.location.href = '/'
        }
      })
      
      if (!name) {
        if(sessionid){
            window.sessionStorage.setItem('session', sessionid)
            window.location.href = '/join' + "?session=" + sessionid
        }else{
            window.location.href = '/join'
        }
        return
      }
      const id = ref(nanoid(32))
      window.sessionStorage.setItem('id', id.value)
      const {data, send} = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}&id=${id.value}`)
      const session = ref<Session>({ id: '', cardsVisible: false, players: [] })
      
      watch(data, (newValue) => {
        session.value = JSON.parse(newValue)
      })

      const vote = (card: string) => {
        if (session.value.cardsVisible) {
          return
        }
        sendMessage('vote', card)
      }

      const revealCards = () => {
        sendMessage('show', '')
      }

      const reset = () => {
        sendMessage('reset', '')
      }

      const sendMessage = (event: 'show' | 'reset' | 'vote', value: string) => {
        send(JSON.stringify({ event, value }))
      }

    return {
        session, vote, revealCards, reset
    };
}