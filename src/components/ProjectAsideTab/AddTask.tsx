import { Aside, Button, Center, createStyles, Group, Loader, MultiSelect, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core"
import { IconCalendarEvent, IconClock } from "@tabler/icons"
import React, { useCallback } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useSWR, { useSWRConfig } from "swr"
import { DatePicker, TimeInput } from "@mantine/dates"
import { useRouter } from "next/router"
import { EditNewProjectTaskDto } from "@/common/types"
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
    const projectId = router.query.projectId as string
    const { data } = useSWR<FeaturesData[]>(`/api/edit/projects/${projectId}/features`)
    const { mutate } = useSWRConfig()
    const { handleSubmit, register, setValue, control, reset, formState: { isSubmitting } } = useForm<EditNewProjectTaskDto>({
        defaultValues: {
            features: [],
        },
    })

    const onSubmit = useCallback<SubmitHandler<EditNewProjectTaskDto>>(async formData => {
        const res = await fetch(`/api/edit/projects/${projectId}/tasks/create`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) {
            return
        }

        reset()
        mutate(`/api/projects/${projectId}/tasks`)
    }, [mutate, projectId, reset])

    return (
        <Aside.Section
            grow
            component={ScrollArea}
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
                            disabled={isSubmitting}
                            styles={{
                                label: {
                                    fontWeight: "normal !important" as "normal",
                                },
                            }}
                        >
                            {isSubmitting ? <Loader /> : "Добавить задачу"}
                        </Button>
                    </Center>
                </Stack>
            </form>
        </Aside.Section>
    )
}
