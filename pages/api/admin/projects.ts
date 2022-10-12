import { withUser } from "@/server/middlewares/withUser"
import { SystemProjectDto as AdminProjectDto } from "@/common/types"
import { hasAdminRole } from "@/server/lib"
import { getAllProjects } from "@/server/controllers/admin/projects"

const handler = withUser<AdminProjectDto[]>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }
    const isAdmin = await hasAdminRole(req, res)
    if (!isAdmin) {
        return res.status(403).json({
            error: "Forbidden",
        })
    }

    const items = await getAllProjects()

    return res.json(items)
})

export default handler
