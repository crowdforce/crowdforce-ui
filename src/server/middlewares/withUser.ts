import { ErrorDto } from "@/common/types"
import prisma from "@/server/prisma"
import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

export type NextApiRequestWithUser = NextApiRequest & {
  user: User
}

export type WithUserHandler<T = any> = (req: NextApiRequestWithUser, res: NextApiResponse<T>) => Promise<NextApiResponse<T> | void>

export function withUser<T = any>(handler: WithUserHandler<T | ErrorDto>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = await getToken({ req })
        if (!token) {
            return res.status(401).json({
                error: "Not authorized",
            })
        }

        const userId = token.sub
        if (!userId) {
            return res.status(401).json({
                error: "Not authorized",
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        if (!user) {
            return res.status(500).json({
                error: "Unknown",
            })
        }

        (req as any).user = user

        return handler(req as NextApiRequestWithUser, res)
    }
}
