import { AdminProjectDto, NewAssetDto, ProjectCoverPayloadDto } from "@/common/types"
import { Aside, createStyles, ScrollArea } from "@mantine/core"
import { MIME_TYPES } from "@mantine/dropzone"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { FileDrop } from "../FileDrop"
import { ProjectEditForm } from "../ProjectEditForm"

async function sha() {
    // var filesize = fileInput.files[0].size;
    // var reader = new FileReader();
    // reader.onload = function (ev) {
    //     console.log("File", filename, ":");
    //     //
    //     crypto.subtle.digest('SHA-256', ev.target.result).then(hashBuffer => {
    //         // Convert hex to hash, see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
    //         const hashArray = Array.from(new Uint8Array(hashBuffer));
    //         const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    //         console.log(hashHex);
    //     }).catch(ex => console.error(ex));
    // };
    // reader.onerror = function (err) {
    //     console.error("Failed to read file", err);
    // }
    // reader.readAsArrayBuffer(fileInput.files[0]);
}

type ProjectEditProps = {

}

const useStyles = createStyles((theme) => ({
    aside: {
        position: "sticky",
        borderRadius: theme.radius.lg,
        margin: theme.spacing.xs,
    },
}))

export const Edit: React.FC<ProjectEditProps> = () => {
    const { classes: s, cx } = useStyles()
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${projectId}`)

    // const [files, setFiles] = useState<FileWithPath[]>([]);

    // const previews = files.map((file, index) => {
    //     const imageUrl = URL.createObjectURL(file);
    //     return (
    //         <Image
    //             key={index}
    //             src={imageUrl}
    //             imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
    //         />
    //     );
    // });
    // <SimpleGrid
    //     cols={4}
    //     breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
    //     mt={previews.length > 0 ? 'xl' : 0}
    // >
    //     {previews}
    // </SimpleGrid>

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='md'
        >
            <FileDrop
                multiple={false}
                onDrop={async files => {
                    const file = files[0]
                    const query = new URLSearchParams({
                        filename: file.name,
                        size: `${file.size}`,
                        mime: file.type,
                        hash: "_",
                    })
                    const url = `/api/assets/upload-url?${query}`
                    const res = await fetch(url, {
                        method: "POST",
                    })
                    const asset = await res.json() as NewAssetDto

                    await fetch(asset.uploadUrl, {
                        method: "PUT",
                        body: file,
                        headers: {
                            "Content-type": file.type,
                            "x-amz-acl": "public-read",
                        },
                    })

                    const updateCoverPayload: ProjectCoverPayloadDto = {
                        assetId: asset.id,
                    }
                    await fetch(`/api/admin/projects/${projectId}/update-cover`, {
                        method: "PUT",
                        body: JSON.stringify(updateCoverPayload),
                        headers: {
                            "Content-type": "application/json",
                        },
                    })
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                accept={[
                    MIME_TYPES.jpeg,
                    MIME_TYPES.png,
                ]}

            ></FileDrop>

            {!data ? null : (
                <ProjectEditForm
                    data={data}
                />
            )}
        </Aside.Section>
    )
}
