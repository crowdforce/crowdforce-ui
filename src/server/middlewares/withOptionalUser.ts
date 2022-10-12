import prisma from "@/server/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { ErrorDto } from "@/common/types"
import { User } from "@prisma/client"

export type NextApiRequestWithOptionalUser = NextApiRequest & {
    user?: User
}

export type WithOptionalUserHandler<T = any> = (req: NextApiRequestWithOptionalUser, res: NextApiResponse<T>) => Promise<NextApiResponse<T> | void>

export function withOptionalUser<T = any>(handler: WithOptionalUserHandler<T | ErrorDto>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = await getToken({ req })
        if (token && token.sub) {
            const userId = token.sub
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            })

            if (user) {
                (req as any).user = user
            }
        }

        return handler(req as NextApiRequestWithOptionalUser, res)
    }
}
