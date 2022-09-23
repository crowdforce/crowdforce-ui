import { withUser } from "@/server/middlewares/withUser"
import { getOwnProjects } from "@/server/controllers/profile/projects"
import { ProjectDto } from "@/common/types"

const handler = withUser<ProjectDto[]>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const userId = req.user.id
    const items = await getOwnProjects(userId)

    return res.json(items)
})

export default handler
