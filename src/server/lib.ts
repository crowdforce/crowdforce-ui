import { getToken, GetTokenParams } from "next-auth/jwt"

export async function getUserId(ctx: GetTokenParams): Promise<string | null> {
    const session = await getToken(ctx)
    if (!session) {
        return null
    }

    const userId = session.sub
    if (!userId) {
        return null
    }

    return userId
}
