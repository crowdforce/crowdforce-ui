import { Aside, Button, Center, createStyles, Group, MultiSelect, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core"
import { IconCalendarEvent, IconClock } from "@tabler/icons"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useSWR, { useSWRConfig } from "swr"
import { DatePicker, TimeInput } from "@mantine/dates"
import { useRouter } from "next/router"
import { ProjectTaskContext } from "@/contexts/projectTask"
import { ProjectTask } from "pages/api/projects/[projectId]/tasks"
import "dayjs/locale/ru"

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
        height: "100%",
        "& span": {
            fontWeight: "bold",
        },
    },
}))

export const AddTask: React.FC<ProjectAddTaskProps> = () => {
    const { classes: s } = useStyles()
    const router = useRouter()
    const { data } = useSWR<FeaturesData[]>(`/api/admin/projects/${router.query.projectId}/features`)
    const { task, setTask } = useContext(ProjectTaskContext)
    const { handleSubmit, register, setValue, control } = useForm<Partial<ProjectTask>>({
        defaultValues: task ? task : {},
    })
    useEffect(() => {
        setTask(null)
    })
    const { mutate } = useSWRConfig()

    const onSubmit = useCallback(
        (formData: any) => {
            setSaved(false)
            setFormError(false)
            console.log("submitted form:", JSON.stringify(formData, null, 3))
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
                    "& > div": {
                        height: "100%",
                    },
                },
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={s.form}
            >
                <Stack
                    pb='xs'
                    sx={{
                        height: "100%",
                    }}
                >
                    <TextInput
                        {...register(
                            "title",
                            {
                                required: "Добавьте название",
                            },
                        )}
                        label='Название задачи'
                        placeholder='Что надо будет сделать?'
                        required
                    />

                    <Textarea
                        {...register(
                            "description",
                            {
                                required: "Добавьте описание",
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
                        <Controller
                            control={control}
                            name="dateStart"
                            render={({ field: { value, ...field } }) => (
                                <DatePicker
                                    {...field}
                                    value={value ? new Date(value) : undefined}
                                    label='Дата начала выполнения'
                                    placeholder='Когда начинаем?'
                                    icon={<IconCalendarEvent />}
                                    withAsterisk
                                />
                            )}
                        />
                        <TimeInput
                            {...register(
                                "timeStart",
                                {
                                    required: "Добавьте время начала",
                                },
                            )}
                            onChange={value => value && setValue("timeStart", value.toString())}
                            label='Время начала выполнения'
                            placeholder='Во сколько начинаем?'
                            icon={<IconClock />}
                            withAsterisk
                        />
                    </Group>
                    <Group
                        grow
                    >
                        <Controller
                            control={control}
                            name="dateEnd"
                            render={({ field: { value, ...field } }) => (
                                <DatePicker
                                    {...field}
                                    value={value ? new Date(value) : undefined}
                                    label='Дата завершения выполнения'
                                    placeholder='Когда заканчиваем?'
                                    icon={<IconCalendarEvent />}
                                    withAsterisk
                                />
                            )}
                        />
                        <TimeInput
                            {...register(
                                "timeEnd",
                                {
                                    required: "Добавьте времяначала",
                                },
                            )}
                            onChange={value => value && setValue("timeEnd", value.toString())}
                            label='Время завершения выполнения'
                            icon={<IconClock />}
                            withAsterisk
                        />
                    </Group>

                    <MultiSelect
                        {...register("features")}
                        onChange={value => setValue("features", value)}
                        label='Элементы учавствующие в задаче'
                        placeholder='Какие элементы относятся к задаче?'
                        data={!data ? [] : data.map((x) => ({
                            value: x.id,
                            label: x.title,
                            group: x.type,
                        }))}
                    />

                    <Center
                        sx={{
                            marginTop: "auto",
                        }}
                    >
                        <Button
                            type='submit'
                            styles={{
                                label: {
                                    fontWeight: "normal !important" as "normal",
                                },
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
