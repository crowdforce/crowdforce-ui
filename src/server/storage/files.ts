import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand, PutObjectCommandInput, S3 } from "@aws-sdk/client-s3"

export class FileStorage {
    constructor(private s3: S3) { }

    public async getUploadUrl(params: PutObjectCommandInput) {
        try {
            const url = await getSignedUrl(this.s3, new PutObjectCommand(params), {
                expiresIn: 15 * 60,
            })
            return url
        } catch (err) {
            return null
        }
    }
}
