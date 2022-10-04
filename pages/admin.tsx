import Page from "@/components/Page"
import { createStyles, Stack, Title, ActionIcon, Menu, Table, Text, Badge, Loader } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getOwnProjects } from "@/server/controllers/profile/projects"
import useSWR from "swr"
import { ProjectDto } from "@/common/types"
import { IconBan, IconDots, IconEyeOff, IconTrash } from "@tabler/icons"
import Link from "next/link"
import { ProjectStatus } from "@prisma/client"
import { useCallback } from "react"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },
}))

type Props = {
}

const statusComponents = {
    "Active": (
        <Badge>
            Нормальный
        </Badge>
    ),
    "Init": (
        <Badge color="gray">
            Новый
        </Badge>
    ),
    "Banned": (
        <Badge color="red">
            В бане
        </Badge>
    ),
}
// placeholder, should be like SomethingDto
type ProjectType = ProjectDto & {
    status: ProjectStatus
}

const ProfilePage: NextPage<Props> = () => {
    const { classes: s } = useStyles()
    const { data: own } = useSWR<ProjectType[]>("/api/profile/projects")

    const onDelete = useCallback((id: string) => null, [])
    const onBan = useCallback((id: string) => null, [])
    const onHide = useCallback((id: string) => null, [])

    return (
        <Page>
            <Stack
                align="center"
                spacing="xl"
            >
                <Title
                    className={s.section}
                    mt="xl"
                >
                    Админская панель
                </Title>
                <Table
                    className={s.section}
                    verticalSpacing="lg"
                >
                    <tbody>
                        {!own ? <Loader /> : own.map(({ id, title, status }) => (
                            <tr key={id}>
                                <td>
                                    <Link href={`/project/${id}`} passHref>
                                        <Text
                                            component='a'
                                            inherit
                                        >
                                            {title}
                                        </Text>
                                    </Link>
                                </td>
                                <td>
                                    <Text
                                        weight="bold"
                                    >
                                        {statusComponents[status] ?? null}
                                    </Text>
                                </td>
                                <td>
                                    <Menu
                                        shadow="lg"
                                    >
                                        <Menu.Target>
                                            <ActionIcon size={"xl"}>
                                                <IconDots />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                icon={<IconTrash />}
                                                onClick={() => onDelete(id)}
                                            >
                                                {"Удалить"}
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconBan />}
                                                onClick={() => onBan(id)}
                                            >
                                                {"Забанить"}
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconEyeOff />}
                                                onClick={() => onHide(id)}
                                            >
                                                {"Скрыть с главной"}
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Page >
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const userId = await getUserId(ctx)

    // placeholder user role
    const isGlobalAdmin = true
    if (!userId || !isGlobalAdmin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const projects = await getOwnProjects(userId)

    return {
        props: {
            fallback: {
                "/api/profile/projects": projects,
            },
        },
    }
}

export default ProfilePage
