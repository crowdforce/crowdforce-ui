import { S3 } from "@aws-sdk/client-s3"

export const s3Client = new S3({
    endpoint: process.env.SPACES_ENDPOINT!,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.SPACES_KEY!,
        secretAccessKey: process.env.SPACES_SECRET!,
    },
})
