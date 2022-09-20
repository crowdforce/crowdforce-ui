import { signOut, useSession } from "next-auth/react"
import Page from "@/components/Page"
import { Avatar, createStyles, Group, Stack, Title, Text, Button, SimpleGrid, Box, Divider } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getProjects, ProfileResponseDto } from "@/server/controllers/profile"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectAddCard } from "@/components/ProjectAddCard"
import { ProfileTasks } from "@/components/ProfileTasks"
import { FollowedTask } from 'types/task'

const useStyles = createStyles((theme) => ({
    section: {
        width: "100%",
        maxWidth: 1160,
    },
    logoutButton: {
        width: "fit-content",
        minWidth: "min(100%, 200px)",
    },
}))

type Props = {
    profile: ProfileResponseDto
    tasks: FollowedTask[]
}

const ProfilePage: NextPage<Props> = ({ profile, tasks }) => {
    const session = useSession()
    const { classes: s } = useStyles()

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
                    {profile.following.map(({ id, title, description, imageUrl }) => (
                        <ProjectCard
                            key={id}
                            coverSrc={imageUrl}
                            title={title}
                            description={description}
                            href={`/project/${id}`}
                        />
                    ))}
                    <ProjectAddCard />
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
                    <ProfileTasks
                        data={tasks}
                    />
                    <Divider sx={{ opacity: .5 }} />
                </Box>

                <Title
                    className={s.section}
                    mt="xl"
                >
                    Интересные проекты
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
                    {/* wrong projects data */}
                    {profile.following.map(({ id, title, description, imageUrl }) => (
                        <ProjectCard
                            key={id}
                            coverSrc={imageUrl}
                            title={title}
                            description={description}
                            href={`/project/${id}`}
                        />
                    ))}
                </SimpleGrid>
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

    const profile = await getProjects(userId)
    const tasks = [ // no path in backend
        {
            "id": "cl86ovzbb0044pb3krupkrdpz",
            "title": "Обоссать",
            "description": "Просим обоссать каждое дерево в парке.",
            "dateStart": "Thu Sep 15 2022",
            "timeStart": "Tue Sep 20 2022",
            "dateEnd": "Thu Sep 15 2022",
            "timeEnd": "Tue Sep 20 2022",
            "role": "follower",
            "followers": [
                {
                    "id": "cl787cvnz0012jb3kcg23zg4w",
                    "name": "Roman Timashev",
                    "image": "https://t.me/i/userpic/320/pyFRk5ueqLuVIiYhmRzZrpv8KOD6n1wqAWgudLRb6Sg.jpg",
                    "status": "participant",
                },
            ],
        },
        {
            "id": "cl86psi2a0316pb3kngazt098",
            "title": "Добавить навозия",
            "description": "Навозия очень мало, давайте добавим",
            "dateStart": "Thu Sep 15 2022",
            "timeStart": "Tue Sep 20 2022",
            "dateEnd": "Thu Sep 15 2022",
            "timeEnd": "Tue Sep 20 2022",
            "role": "leader",
            "followers": [],
        },
    ]

    return {
        props: {
            profile,
            tasks,
        },
    }
}

export default ProfilePage
