import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { createStyles, Group, Text, Stack, Accordion, Avatar, Center, Space, Loader } from "@mantine/core"
import { useRouter } from "next/router"
import { useContext } from "react"
import useSWR from "swr"
import { FollowTaskButton } from "@/components/FollowTaskButton"
import { SetAsLeaderButton } from "@/components/SetAsLeaderButton"
import { CopyAsNewTaskButton } from "@/components/CopyAsNewTaskButton"
import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import { ProjectTaskDto } from "@/common/types"

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
    task: ProjectTaskDto
    color?: string | undefined
    variant?: "default" | "completed"
}

export const ProjectTask: React.FC<ProjectTaskProps> = ({ task, color, variant = "default" }) => {
    const { classes: s, cx } = useStyles()
    const { isAdmin } = useContext(ProjectSideMenuContext)
    const isDefault = variant === "default"
    const isCompleted = variant === "completed"
    const router = useRouter()
    const { data } = useSWR<ProjectTaskDto[]>(`/api/projects/${router.query.projectId}/tasks`)
    const session = useSession()
    const isUnauthenticated = session.status == "unauthenticated"

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

                    {isUnauthenticated ? null : (isAdmin || isDefault) && (
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
                    )}
                    {task.followers
                        .sort((a, b) => {
                            if (a.status == "leader") return -1
                            if (b.status == "leader") return 1
                            return 0
                        })
                        .map((y => (
                            <Group
                                key={y.name}
                                noWrap
                                position='apart'
                            >
                                <Group
                                    noWrap
                                    sx={{
                                        flex: "1 1 auto",
                                    }}
                                >
                                    <Avatar
                                        size='sm'
                                        src={y.image}
                                    />
                                    <Text
                                        sx={{
                                            flex: "1 1 auto",
                                        }}
                                    >
                                        {y.name}
                                    </Text>
                                </Group>
                                {y.status == "leader" ? (
                                    <Center>
                                        <Text
                                            weight={700}
                                            transform='uppercase'
                                            sx={{
                                                fontSize: 13,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            ответственый
                                        </Text>
                                    </Center>
                                ) : isDefault && isAdmin && (
                                    <SetAsLeaderButton
                                        projectId={router.query.projectId as string}
                                        taskId={task.id}
                                        userId={y.id as string}
                                        status={y.status}
                                    />
                                )}
                            </Group>
                        )))}
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}
