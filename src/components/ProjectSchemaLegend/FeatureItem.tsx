import useSWR, { useSWRConfig } from "swr"
import { FeatureDto } from "@/common/types"
import { Loader } from "@mantine/core"
import { FeatureForm, FeatureOnSubmit } from "./FeatureForm"
import { useCallback } from "react"
import { showNotification } from "@mantine/notifications"

export type FeatureItemProps = {
    projectId: string
    featureId: string
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ featureId, projectId }) => {
    const { mutate } = useSWRConfig()
    const onSubmit = useCallback<FeatureOnSubmit>(async data => {
        try {
            const res = await fetch(`/api/edit/features/${data.id}/update`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                showNotification({
                    title: "Ошибка!",
                    message: "!",
                    color: "red",
                })
            }
            mutate(`/api/edit/features/${data.id}`)
            mutate(`/api/edit/projects/${projectId}/features`)

            showNotification({
                title: "Успех!",
                message: "Сохранено!",
            })
        } catch (error) {
            showNotification({
                title: "Ошибка!",
                message: "!",
                color: "red",
            })
        }
    }, [projectId, mutate])

    const { data } = useSWR<FeatureDto>(`/api/edit/features/${featureId}`)
    if (!data) {
        return (
            <Loader />
        )
    }

    return (
        <FeatureForm
            data={data}
            onSubmit={onSubmit}
        />
    )
}
