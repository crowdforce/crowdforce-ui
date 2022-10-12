import { EditProjectDto, NewAssetDto, ProjectCoverPayloadDto } from "@/common/types"
import { Aside, ScrollArea, Text, Group, Image, Space } from "@mantine/core"
import { MIME_TYPES } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import React, { useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { FileDrop } from "../FileDrop"
import { ProjectEditForm } from "../ProjectEditForm"
import { IconPhoto } from "@tabler/icons"

// async function sha() {
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
// }

type ProjectEditProps = {

}

export const Edit: React.FC<ProjectEditProps> = () => {
    const [coverLoading, setCoverLoading] = useState(false)
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { mutate } = useSWRConfig()
    const { data } = useSWR<EditProjectDto>(`/api/edit/projects/${projectId}`)
    const preview = data?.imageUrl ?? null

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='md'
        >
            <FileDrop
                multiple={false}
                loading={coverLoading}
                p="md"
                onDrop={async files => {
                    setCoverLoading(true)
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
                    await fetch(`/api/edit/projects/${projectId}/update-cover`, {
                        method: "PUT",
                        body: JSON.stringify(updateCoverPayload),
                        headers: {
                            "Content-type": "application/json",
                        },
                    })

                    showNotification({
                        title: "Успех!",
                        message: "Обложка обновилась",
                    })
                    mutate(`/api/edit/projects/${projectId}`)
                    mutate(`/api/projects/${projectId}`)
                    setCoverLoading(false)
                }}
                onReject={(rejects) => {
                    const reject = rejects[0]
                    // const t = 'file-too-large'

                    for (const e of reject.errors) {
                        showNotification({
                            title: reject.file.name,
                            message: e.message,
                            color: "red",
                        })
                    }
                    setCoverLoading(false)
                }}
                maxSize={5 * 1024 ** 2}
                accept={[
                    MIME_TYPES.jpeg,
                    MIME_TYPES.png,
                ]}

            >
                {preview ? (
                    <div style={{
                        position: "relative",
                        flex: 1,
                    }}>
                        <Image
                            src={preview}
                            alt={""}
                            radius="md"
                        />
                    </div>
                ) : (
                    <Group
                        noWrap
                    >
                        <IconPhoto size={50} stroke={1.5} />
                        <div>
                            <Text size="xl" inline>
                                Перетащите картинку сюда<br />или кликните
                            </Text>
                            <Text size="sm" color="dimmed" inline mt={7}>
                                Размер не более 5мб
                            </Text>
                        </div>
                    </Group>
                )}
            </FileDrop>

            <Space h="lg" />

            {!data ? null : (
                <ProjectEditForm
                    data={data}
                />
            )}
        </Aside.Section>
    )
}
