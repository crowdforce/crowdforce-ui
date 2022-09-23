import { withUser } from "@/server/middlewares/withUser"
import { getUserTasks } from "@/server/controllers/profile/tasks"

const handler = withUser(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const userId = req.user.id
    const items = await getUserTasks(userId)

    return res.json(items)
})

export default handler
