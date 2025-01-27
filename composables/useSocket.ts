import { type Session } from '../types/types'
import { nanoid } from 'nanoid'

let socket: {data: Ref<string | null>, send: (message: string) => void} = {
    data: ref(null),
    send: () => {}
}

export function useSocket() {


    const sessionid = window.location.pathname.split('/').pop()
    if(sessionid !=='new'){
        fetch(`/api/session/${sessionid}`)
        .then(response => {
            if (!response.ok ) {
            window.location.href = '/'
            }
        })
    }
    
    const name = window.sessionStorage.getItem('name')

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
   
    const session = ref<Session>({ id: '', cardsVisible: false, players: [] })

    const connect = (sessionid:string, name:string) => {
        const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
        socket = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}&id=${id.value}`)
        initWatcher();
    }

    const initWatcher = () => {
        watch(socket.data, (newValue) => {
            console.log('value cahnged')
            console.log(newValue)
            session.value = JSON.parse(newValue!)
            if(sessionid === 'new'){
                window.history.replaceState(null, '', '/session/' + session.value.id)
            }
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