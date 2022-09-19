import { createStyles, Group, Text, Stack, Accordion, Space, Loader, Button } from "@mantine/core"
import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import dayjs from "dayjs"
import { ProjectTaskDto } from "@/common/types"
import { ParticipantList } from "./ParticipantList"

const useStyles = createStyles((theme) => ({
    control: {
        "& > div:nth-child(1)": { // select chevron
            marginRight: 0,
        },
    },
    item: {
        "&:hover": {
            background: theme.colors.lime[1],
        },
        "&[data-active]": {
            background: theme.colors.lime[1],
        },
    },
    groupHead: {
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },
    completed: {
        opacity: .5,
    },
}))

export type ProjectTaskProps = {
    projectId: string
    task: ProjectTaskDto
    color?: string | undefined
    variant?: "default" | "completed"
}

export const ProjectTask: React.FC<ProjectTaskProps> = ({ task, color, variant = "default" }) => {
    const { classes: s, cx } = useStyles()
    const { mutate } = useSWRConfig()
    const isCompleted = variant === "completed"
    const router = useRouter()
    const { data } = useSWR<ProjectTaskDto[]>(`/api/projects/${router.query.projectId}/tasks`)

    if (!data) {
        return <Loader />
    }

    return (
        <Accordion.Item
            value={task.id}
            className={cx(s.item, isCompleted && s.completed)}
            sx={{
                background: color,
            }}
        >
            <Accordion.Control
                className={s.control}
            >
                <Group
                    noWrap
                    position='apart'
                    align='flex-start'
                    className={s.groupHead}
                >
                    <Text>
                        {task.title}
                    </Text>
                    <Group
                        noWrap
                        spacing={"xs"}
                    >
                        <Stack
                            spacing={0}
                        >
                            <Text
                                weight={700}
                            >
                                {dayjs(task.dateStart).format("DD.MM.YYYY")}
                            </Text>

                            {task.dateStart !== task.dateEnd && (
                                <Text
                                    weight={700}
                                >
                                    {dayjs(task.dateEnd).format("DD.MM.YYYY")}
                                </Text>
                            )}
                        </Stack>
                        <Stack
                            spacing={0}
                        >
                            <Text>
                                {dayjs(task.timeStart).format("HH:MM")}
                            </Text>
                            <Text>
                                {dayjs(task.timeEnd).format("HH:MM")}
                            </Text>
                        </Stack>
                    </Group>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Stack
                    spacing='xs'
                >
                    <Text>
                        {task.description}
                    </Text>
                    <Space />

                    <Button
                        onClick={async () => {
                            const res = await fetch(`/api/tasks/${task.id}/participate`, {
                                method: "POST",
                            })

                            if (res.ok) {
                                mutate(`/api/projects/${projectId}/tasks`)
                            }
                        }}
                    >Взять задачу</Button>

                    {/* {isUnauthenticated ? null : (isAdmin || isDefault) && (
                        <>
                            <Center>
                                <Group>
                                    {isAdmin && (
                                        <CopyAsNewTaskButton
                                            task={task}
                                        />
                                    )}
                                    {isDefault && (
                                        <FollowTaskButton
                                            projectId={router.query.projectId as string}
                                            taskId={task.id}
                                            status={null}
                                        />
                                    )}
                                </Group>
                            </Center>
                            <Space />
                        </>
                    )} */}

                    <ParticipantList taskId={task.id} />
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}
