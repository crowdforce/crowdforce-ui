import { EditProjectDto, ProjectCoverPayloadDto } from "@/common/types"
import { Text, Group, Image, Space } from "@mantine/core"
import { MIME_TYPES } from "@mantine/dropzone"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import React, { useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { FileDrop } from "../FileDrop"
import { ProjectEditForm } from "../ProjectEditForm"
import { IconPhoto } from "@tabler/icons"
import { upload } from "@/api/upload"

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
        <>
            <FileDrop
                multiple={false}
                loading={coverLoading}
                p="md"
                onDrop={async files => {
                    setCoverLoading(true)
                    const file = files[0]
                    const asset = await upload(file)

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
        </>
    )
}
