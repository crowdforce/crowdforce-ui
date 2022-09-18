import prisma from "@/server/prisma"
import { withUser } from "@/server/middlewares/withUser"
import { FileStorage } from "@/server/storage/files"
import { s3Client } from "@/server/s3"

const handler = withUser<any>(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const mimeType = req.query.mime as string
    const filename = req.query.filename as string
    const sha256 = req.query.hash as string
    const size = req.query.size as string

    const asset = await prisma.asset.create({
        data: {
            mimeType,
            src: "",
            size: parseInt(size),
            sha256,
            filename,
            ownerId: req.user.id,
        },
    })

    const storage = new FileStorage(s3Client)
    const key = `assets/${asset.id}.jpg`
    const src = storage.getFileUrl(key)
    await prisma.asset.update({
        where: {
            id: asset.id,
        },
        data: {
            src,
        },
    })

    const result = await storage.getUploadUrl(key, mimeType)
    if (!result) {
        return res.status(500).json({
            error: "Failed to get upload url",
        })
    }

    return res.json({
        uploadUrl: result,
    })
})

export default handler
