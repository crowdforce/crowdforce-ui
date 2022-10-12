import { withUser } from "@/server/middlewares/withUser"
import { hasAdminRole } from "@/server/lib"
import { addToTop, deleteFromTop } from "@/server/controllers/admin/projects"

type Result = {
    status: boolean
}

const handler = withUser<Result>(async (req, res) => {
    const isAdmin = await hasAdminRole(req, res)
    if (!isAdmin) {
        return res.status(403).json({
            error: "Forbidden",
        })
    }

    const projectId = req.query.projectId as string

    if (req.method === "PUT") {
        const status = await addToTop(projectId)
        return res.json({ status })
    }

    if (req.method === "DELETE") {
        const status = await deleteFromTop(projectId)
        return res.json({ status })
    }

    return res.status(404).json({
        error: "Not found",
    })
})

export default handler
