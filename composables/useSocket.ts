import { type Session } from '../types/types'
import { nanoid } from 'nanoid'


export function useSocket() {
    const connect = (sessionid:string, name:string) => {
        const protocol= window.location.protocol === 'https:' ? 'wss' : 'ws'
        const {data, send} = useWebSocket(`${protocol}://${location.host}/api/websocket?session=${sessionid}&name=${name}&id=${id.value}`)
        socket = { data, send }
    }
    
    if (typeof window === 'undefined') {
        return
    }

    let socket: {data: Ref<string | null>, send: (message: string) => void} = {
        data: ref(null),
        send: () => {}
    }

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
    connect(sessionid!, name)   
    watch(socket.data, (newValue) => {
        session.value = JSON.parse(newValue!)
        if(sessionid === 'new'){
            window.history.replaceState(null, '', '/session/' + session.value.id)
        }
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
        socket.send(JSON.stringify({ event, value }))
    }

    return {
        session, vote, revealCards, reset
    };
}