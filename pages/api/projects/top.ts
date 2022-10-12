import { ErrorDto, PublicProjectDto } from "@/common/types"
import { getTopProjects } from "@/server/controllers/projects/public"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse<PublicProjectDto[] | ErrorDto>) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projects = await getTopProjects()

    return res.json(projects)
}

export default handler
