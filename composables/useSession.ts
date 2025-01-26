
export function useSession() {
    const sessionExists = (sessionId: string) => {
        fetch(`/api/session/${sessionId}`)
        .then(response => {
            return response.ok
        })
    }

    return {
        sessionExists
    };
}