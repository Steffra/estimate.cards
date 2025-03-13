import { type Session } from '../types/types'

export function useSocket() {
    let socket: ReturnType<typeof useWebSocket>

    const session = ref<Session>({ id: '', cardsVisible: false, players: [] })

    const connect = (sessionid:string, name:string, playerId:string) => {
        const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
        socket = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${encodeURIComponent(name)}&id=${playerId}`)
        socket.ws.value!.onclose = (event) => {
            if(event.code === 0 ){
                window.location.href = '/'
            }
        };

        watch(socket.data, (newValue) => {
            session.value = JSON.parse(newValue)
            window.history.replaceState(null, '', '/' + session.value.id)
        })
        keepAlive()
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

    const toggleObserverMode = () => {
        sendMessage('toggleObserverMode', '')
    }

    const sendMessage = (event: 'ping' | 'show' | 'reset' | 'vote' | 'toggleObserverMode', value: string) => {
        if(socket.ws.value?.readyState === WebSocket.CLOSED){
            reconnect()
        }   
        socket.send(JSON.stringify({ event, value }))
     }
    
     const keepAlive = () => {
        setInterval(() => {
            sendMessage('ping', '')
        }, 5000)
    }

    const disconnect = () => {
        console.log('disconnect')
        if(socket && socket.ws.value){
            socket.ws.value?.close()
        }
    }

    const reconnect = () => {   
        const name  = localStorage.getItem('name')
        const playerId = localStorage.getItem('id')
        if(!name || !playerId || !session.value.id){
            location.href = '/'
            return
        }
        connect(session.value.id, name, playerId)
    }

    return {
        connect, session, vote, revealCards, reset, toggleObserverMode, disconnect
    };
}