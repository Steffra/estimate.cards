import { type Session } from '../types/types'

export function useSocket() {
    let socket: {data: Ref<string | null>, send: (message: string) => void} = {
        data: ref(null),
        send: () => {}
    }

    const session = ref<Session>({ id: '', cardsVisible: false, players: [] })
    
    const connect = (sessionid:string, name:string, playerId:string) => {
        const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
        socket = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}&id=${playerId}`)
        watch(socket.data, (newValue) => {
            session.value = JSON.parse(newValue!)
            window.history.replaceState(null, '', '/session/' + session.value.id)
        })    }
    
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