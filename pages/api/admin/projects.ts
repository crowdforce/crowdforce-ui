import { withUser } from "@/server/middlewares/withUser"
import { SystemProjectDto } from "@/common/types"
import { hasAdminRole } from "@/server/lib"
import { getAllProjects } from "@/server/controllers/admin/projects"
import { getSession } from "next-auth/react"

const handler = withUser<SystemProjectDto[]>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }
    const isAdmin = await hasAdminRole(req)
    // if (!isAdmin) {
    //     return res.status(403).json({
    //         error: "Forbidden",
    //     })
    // }
    // const session = await getSession(req)

    const items = await getAllProjects()

    return res.json(items)
})

export default handler
