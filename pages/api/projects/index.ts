import { ErrorDto, PublicProjectDto } from "@/common/types"
import { getPublicProjects } from "@/server/controllers/projects/public"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse<PublicProjectDto[] | ErrorDto>) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projects = await getPublicProjects()

    return res.json(projects)
}

export default handler
