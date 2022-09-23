import { signOut, useSession } from "next-auth/react"
import Page from "@/components/Page"
import { Avatar, createStyles, Group, Stack, Title, Text, Button, SimpleGrid, Box, Divider } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getFollowingProjects, getOwnProjects } from "@/server/controllers/profile/projects"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectAddCard } from "@/components/ProjectAddCard"
import { ProfileTasks } from "@/components/ProfileTasks"
import greenLine from "@/../public/index/heroLine.svg"
import blueLine from "@/../public/index/blueLine.svg"
import Image from "next/image"
import { getUserTasks } from "@/server/controllers/profile/tasks"
import useSWR from "swr"
import { ProjectDto } from "@/common/types"
import { FollowingProjects } from "@/components/FollowingProjects"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },
    logoutButton: {
        width: "fit-content",
        minWidth: "min(100%, 150px)",
    },
    line: {
        position: "absolute",
        transform: "translate(40%)",
        zIndex: -1,
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },
    blueLine: {
        bottom: "-25%",
        right: 0,
        transform: "translate(40%)",
    },
    greenLine: {
        top: "-30px",
        left: 0,
        transform: "translate(-40%)",
    },
}))

type Props = {
}

const ProfilePage: NextPage<Props> = () => {
    const session = useSession()
    const { classes: s, cx } = useStyles()
    const { data: own } = useSWR<ProjectDto[]>("/api/profile/projects")

    return (
        <Page>
            <Stack
                align="center"
                spacing="xl"
            >
                <Group
                    noWrap
                    position="apart"
                    className={s.section}
                >
                    <Group>
                        <Avatar
                            src={session.data?.user?.image!}
                            size={32}
                        />
                        <Text size="sm" sx={{ lineHeight: 1 }}

                        >
                            {session.data?.user?.name!}
                        </Text>
                    </Group>
                    <Button
                        className={s.logoutButton}
                        onClick={() => signOut()}
                    >
                        Выйти
                    </Button>
                </Group>

                <Title
                    className={s.section}
                    mt="xl"
                >
                    Мои проекты
                </Title>
                <SimpleGrid
                    className={s.section}
                    cols={3}
                    breakpoints={[
                        { maxWidth: "xl", cols: 3 },
                        { maxWidth: "md", cols: 2 },
                        { maxWidth: "xs", cols: 1 },
                    ]}
                >
                    {!own ? null : own.map(({ id, title, description, imageUrl }) => (
                        <ProjectCard
                            key={id}
                            coverSrc={imageUrl}
                            title={title}
                            description={description}
                            href={`/project/${id}`}
                        />
                    ))}
                    <ProjectAddCard />

                    <div
                        className={cx(s.line, s.blueLine)}
                    >
                        <Image
                            src={blueLine}
                            quality={100}
                            alt=""
                        />
                    </div>
                    <div
                        className={cx(s.line, s.greenLine)}
                    >
                        <Image
                            src={greenLine}
                            quality={100}
                            alt=""
                        />
                    </div>
                </SimpleGrid>

                <Title
                    className={s.section}
                    mt="xl"
                >
                    Мои задачи
                </Title>

                <Box
                    className={s.section}
                >
                    <Divider sx={{ opacity: .5 }} />
                    <ProfileTasks />
                    <Divider sx={{ opacity: .5 }} />
                </Box>

                <Title
                    className={s.section}
                    mt="xl"
                >
                    Интересные проекты
                </Title>

                <FollowingProjects />
            </Stack>
        </Page >
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const userId = await getUserId(ctx)
    if (!userId) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const projects = await getOwnProjects(userId)
    const followingProjects = await getFollowingProjects(userId)
    const tasks = await getUserTasks(userId)

    return {
        props: {
            fallback: {
                "/api/profile/projects": projects,
                "/api/profile/projects/follow": followingProjects,
                "/api/tasks": tasks,
            },
        },
    }
}

export default ProfilePage
