import { UserRole } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { getToken, GetTokenParams } from "next-auth/jwt"
import { authOptions } from "pages/api/auth/[...nextauth]"

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

export function hasRole(roles: Set<UserRole>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            return false
        }

        const role = session.user.role as UserRole
        return roles.has(role)
    }
}

export async function hasAdminRole(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
    const fn = hasRole(new Set([UserRole.Admin]))

    return fn(req, res)
}
