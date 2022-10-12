import { UserRole } from "@prisma/client"
import { NextApiRequest } from "next"
import { unstable_getServerSession } from "next-auth"
import { getToken, GetTokenParams } from "next-auth/jwt"
import { getSession, GetSessionParams } from "next-auth/react"
// import { authOptions } from 'pages/api/auth/[...nextauth]'

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

export async function hasRole(ctx: GetSessionParams | NextApiRequest, roles: Set<UserRole>): Promise<boolean> {
    // const session = await unstable_getServerSession(req, res, authOptions)

    const session = await getSession(ctx as GetSessionParams)
    if (!session) {
        return false
    }

    const role = session.user.role as UserRole
    return roles.has(role)
}

export async function hasAdminRole(ctx: GetSessionParams | NextApiRequest): Promise<boolean> {
    return hasRole(ctx, new Set([UserRole.Admin]))
}
