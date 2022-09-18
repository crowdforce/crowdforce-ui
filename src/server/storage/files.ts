import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3"

export class FileStorage {
    private bucket = process.env.SPACES_BUCKET!

    constructor(private s3: S3) { }

    public async getUploadUrl(key: string, type: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: type,
            ACL: "public-read",
        })
        try {
            const url = await getSignedUrl(this.s3, command, {
                expiresIn: 15 * 60,
            })
            return url
        } catch (err) {
            return null
        }
    }

    public getFileUrl(key: string) {
        const domain = process.env.SPACES_DOMAIN!

        return `https://${domain}/${key}`
    }
}
