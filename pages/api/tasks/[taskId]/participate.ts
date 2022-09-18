import prisma from "@/server/prisma"
import { withUser } from "@/server/middlewares/withUser"
import { UserResponseStatus } from "@prisma/client"
import { ParticipateDto } from "@/common/types"

export async function participate(taskId: string, userId: string): Promise<ParticipateDto> {
    await prisma.userResponse.upsert({
        where: {
            userId_taskId: {
                userId,
                taskId,
            },
        },
        create: {
            userId,
            taskId,
            status: UserResponseStatus.Participant,
        },
        update: {
            userId,
            taskId,
        },
    })

    return {
        taskId,
        userId,
    }
}

const handler = withUser<ParticipateDto>(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const taskId = req.query.taskId as string
    const userId = req.user.id
    const result = await participate(taskId, userId)

    return res.json(result)
})

export default handler
