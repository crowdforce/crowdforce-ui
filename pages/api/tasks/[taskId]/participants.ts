import prisma from "@/server/prisma"
import { ErrorDto, FollowerDto } from "@/common/types"
import { NextApiRequest, NextApiResponse } from "next"
import { UserResponseStatus } from "@prisma/client"

export async function getParticipants(taskId: string): Promise<FollowerDto[]> {
    const items = await prisma.userResponse.findMany({
        where: {
            taskId,
        },
        include: {
            user: true,
        },
    })

    return items.map(item => ({
        id: item.user.id,
        name: item.user.name!,
        image: item.user.image!,
        status: item.status === UserResponseStatus.Leader
            ? "leader"
            : "participant",
    }))
}

const handler = async (req: NextApiRequest, res: NextApiResponse<FollowerDto[] | ErrorDto>) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const taskId = req.query.taskId as string
    const items = await getParticipants(taskId)

    return res.json(items)
}

export default handler
