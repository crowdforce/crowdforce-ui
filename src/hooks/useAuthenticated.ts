import { useSession } from "next-auth/react"

export function useAuthenticated() {
    const session = useSession()
    return session.status == "unauthenticated"
}
