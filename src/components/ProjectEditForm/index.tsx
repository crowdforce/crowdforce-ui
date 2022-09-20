import { Textarea, TextInput, Button, Stack } from "@mantine/core"
import { useForm } from "react-hook-form"
import { AdminProjectDto } from "@/common/types"
import React, { useCallback } from "react"
import { useSWRConfig } from "swr"
import { showNotification } from "@mantine/notifications"

export type ProjectEditFormProps = {
    data: AdminProjectDto
}

export const ProjectEditForm: React.FC<ProjectEditFormProps> = ({ data }) => {
    const { handleSubmit, register } = useForm({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()

    const onSubmit = useCallback(
        async (formData: any) => {
            try {
                const res = await fetch(`/api/admin/projects/${data.id}/update`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
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
                mutate(`/api/admin/projects/${data.id}`)
                mutate(`/api/projects/${data.id}`)

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
        },
        [data?.id, mutate]
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    {...register(
                        "title",
                        {
                            required: "Добавьте название",
                        },
                    )}
                    label='Название проекта'
                    required
                />
                <Textarea
                    {...register(
                        "description",
                        {
                            required: "Добавьте описание",
                        },
                    )}
                    label='Описание проекта'
                    required
                    minRows={4}
                />

                <Button
                    fullWidth
                    type='submit'
                >
                    Сохранить
                </Button>
            </Stack>
        </form>
    )
}
