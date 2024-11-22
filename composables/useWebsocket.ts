export function useWebsocket() {
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
      const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
      const sessionid = window.location.pathname.split('/').pop()
      const name = window.location.search.split('name=')[1] || window.sessionStorage.getItem('name')
      if (!name) {
        window.location.href = '/join'
      }
      const { status, data, send, open, close } = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}`)
      const session = ref<Session>({ id: '', cardsVisible: false, players: [] })
      
      watch(data, (newValue) => {
        session.value = JSON.parse(newValue)
      
        if (session.value.id) {
          window.history.pushState({}, '', `/session/${session.value.id}`)
        }
      })

      const vote = (card: string) => {

        if (session.value.cardsVisible) {
          return
        }
      
        sendMessage('vote', card)
        }

      const sendMessage = (event: 'show' | 'resett' | 'vote', value: string) => {
        send(JSON.stringify({ event, value }))
      }

    return {
        session, vote
    };
}