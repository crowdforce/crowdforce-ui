import { Aside, Button, Center, createStyles, Group, MultiSelect, ScrollArea, Stack, Textarea, TextInput } from '@mantine/core'
import { IconCalendarEvent, IconClock } from '@tabler/icons'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR, { useSWRConfig } from 'swr'
import { DatePicker, TimeInput } from '@mantine/dates'
import { useRouter } from 'next/router'
import 'dayjs/locale/ru'

type ProjectAddTaskProps = {

}

type FeaturesData = {
    id: string
    title: string
    description: string
    geometryType: string
    coordinates: object
    type: string
}

const useStyles = createStyles((theme) => ({
    form: {
        height: '100%',
        '& span': {
            fontWeight: 'bold',
        }
    }
}))

export const AddTask: React.FC<ProjectAddTaskProps> = () => {
    const { classes: s, cx } = useStyles()
    const router = useRouter()
    const { data, error } = useSWR<FeaturesData[]>(`/api/admin/projects/${router.query.projectId}/features`)
    const { handleSubmit, register, setValue } = useForm()
    const { mutate } = useSWRConfig()

    const onSubmit = useCallback(
        (formData: any) => {
            setSaved(false)
            setFormError(false)
            alert(JSON.stringify(formData, null, 3))
            return

            // below not relevant, change on backend upd

            // fetch(
            //     `/api/admin/projects/${data.id}/update`,
            //     {
            //         method: 'PUT',
            //         body: JSON.stringify(formData),
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     }
            // )
            //     .then(async res => {
            //         if (res.ok && res.status == 200) {
            //             return await res.json()
            //         } else {
            //             throw Error(res.statusText)
            //         }
            //     })
            //     .then((res) => {
            //         setSaved(true)
            //         setError(false)
            //         // mutate()
            //     })
            //     .catch(e => {
            //         setError(true)
            //         console.log('API error: ', e)
            //     })
        },
        []
    )

    const [saved, setSaved] = useState(false)
    const [formError, setFormError] = useState(false)

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
            styles={{
                viewport: {
                    '& > div': {
                        height: '100%',
                    }
                }
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.form}
            >
                <Stack
                    pb='xs'
                    sx={{
                        height: '100%',
                    }}
                >
                    <TextInput
                        {...register(
                            'title',
                            {
                                required: 'Добавьте название',
                            },
                        )}
                        label='Название задачи'
                        placeholder='Что надо будет сделать?'
                        required
                    />

                    <Textarea
                        {...register(
                            'description',
                            {
                                required: 'Добавьте описание',
                            },
                        )}
                        label='Описание задачи'
                        placeholder='Как это надо сделать?'
                        required
                        minRows={8}
                    />

                    <Group
                        grow
                    >
                        <DatePicker
                            {...register(
                                'dateStart',
                                {
                                    required: 'Добавьте дату начала',
                                },
                            )}
                            onChange={value => setValue('dateStart', value)}
                            label='Дата начала выполнения'
                            placeholder='Когда начинаем?'
                            icon={<IconCalendarEvent />}
                            withAsterisk
                        />
                        <TimeInput
                            {...register(
                                'timeStart',
                                {
                                    required: 'Добавьте время начала',
                                },
                            )}
                            onChange={value => setValue('timeStart', value)}
                            label='Время начала выполнения'
                            placeholder='Во сколько начинаем?'
                            icon={<IconClock />}
                            withAsterisk
                        />
                    </Group>

                    <Group
                        grow
                    >
                        <DatePicker
                            {...register(
                                'dateEnd',
                                {
                                    required: 'Добавьте дату конца',
                                },
                            )}
                            onChange={value => setValue('dateEnd', value)}
                            label='Дата завершения выполнения'
                            placeholder='Когда заканчиваем?'
                            icon={<IconCalendarEvent />}
                            withAsterisk
                        />
                        <TimeInput
                            {...register(
                                'timeEnd',
                                {
                                    required: 'Добавьте времяначала',
                                },
                            )}
                            onChange={value => setValue('timeEnd', value)}
                            label='Время завершения выполнения'
                            icon={<IconClock />}
                            withAsterisk
                        />
                    </Group>

                    <MultiSelect
                        {...register('features')}
                        onChange={value => setValue('features', value)}
                        label='Элементы учавствующие в задаче'
                        placeholder='Какие элементы относятся к задаче?'
                        data={!data ? [] : data.map((x, i) => ({
                            value: x.id,
                            label: x.title,
                            group: x.type,
                        }))}
                    />

                    <Center
                        sx={{
                            marginTop: 'auto',
                        }}
                    >
                        <Button
                            type='submit'
                            styles={{
                                label: {
                                    fontWeight: 'normal !important' as 'normal',
                                }
                            }}
                        >
                            Добавить задачу
                        </Button>
                    </Center>
                </Stack>
            </form>
        </Aside.Section>
    )
}
