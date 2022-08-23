import { createStyles, Textarea, TextInput, Button, Stack, Tooltip } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { AdminProjectDto, NewProjectDto } from '@/common/types'
import React, { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'

const useStyles = createStyles((theme) => ({

}))

export const ProjectEditForm: React.FC<{ data: AdminProjectDto }> = ({ data }) => {
    const { classes: s, cx } = useStyles();

    const { handleSubmit, register } = useForm({
        defaultValues: data,
    })

    const { mutate } = useSWRConfig()

    const onSubmit = useCallback(
        (formData: any) => {
            setSaved(false)
            setError(false)

            fetch(
                `/api/admin/projects/${data.id}/update`,
                {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(async res => {
                    if (res.ok && res.status == 200) {
                        return await res.json()
                    } else {
                        throw Error(res.statusText)
                    }
                })
                .then((res: NewProjectDto) => {
                    setSaved(true)
                    setTimeout(() => {
                        setSaved(false)
                    }, 2000)
                    setError(false)
                    mutate(`/api/admin/projects/${data.id}`)
                })
                .catch(e => {
                    setError(true)
                    console.log('API error: ', e)
                })
        },
        [data?.id]
    )

    const [saved, setSaved] = useState(false)
    const [error, setError] = useState(false)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    {...register(
                        'title',
                        {
                            required: 'Добавьте название',
                        },
                    )}
                    label='Название проекта'
                    required
                />
                <Textarea
                    {...register(
                        'description',
                        {
                            required: 'Добавьте описание'
                        },
                    )}
                    label='Описание проекта'
                    required
                    minRows={4}
                />

                <Tooltip
                    label={error ? 'Ошибка' : 'Сохранено'}
                    position='top'
                    radius='xl'
                    transition='slide-up'
                    color={error && 'red' as any}
                    opened={saved || error}
                >
                    <Button
                        fullWidth
                        type='submit'
                    >
                        Сохранить
                    </Button>
                </Tooltip>
            </Stack>
        </form>
    )
}
