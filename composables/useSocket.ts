import { type Session } from '../types/types'

export function useSocket() {
    let socket: ReturnType<typeof useWebSocket>

    const session = ref<Session>({ id: '', cardsVisible: false, players: [] })
    
    const connect = (sessionid:string, name:string, playerId:string) => {
        const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
        socket = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}&id=${playerId}`)
        socket.ws.value!.onclose = (event) => {
            if(event.code === 0 ){
                window.location.href = '/'
            }
        };

        watch(socket.data, (newValue) => {
            session.value = JSON.parse(newValue!)
            window.history.replaceState(null, '', '/session/' + session.value.id)
        }) 
       }
    
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
        socket.send(JSON.stringify({ event, value }))
    }

    return {
        connect, session, vote, revealCards, reset
    };
}