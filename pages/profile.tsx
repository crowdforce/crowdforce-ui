import { signOut, useSession } from "next-auth/react"
import Page from "@/components/Page"
import { Avatar, createStyles, Group, Stack, Title, Text, Button, SimpleGrid, Box, Alert } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getProjects, ProfileResponseDto } from "@/server/controllers/profile"
import { ProjectCard } from "@/components/ProjectCard"
import { ProjectAddCard } from "@/components/ProjectAddCard"
import { ProfileTasks } from "@/components/ProfileTasks"
import greenLine from "@/../public/index/heroLine.svg"
import blueLine from "@/../public/index/blueLine.svg"
import Image from "next/image"
import { IconAlertCircle } from "@tabler/icons"

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
    profile: ProfileResponseDto
}

const ProfilePage: NextPage<Props> = ({ profile }) => {
    const session = useSession()
    const { classes: s, cx } = useStyles()

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
                    {profile.owned.map(({ id, title, description, imageUrl }) => (
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
                    <ProfileTasks />
                </Box>

                <Title
                    className={s.section}
                    mt="xl"
                >
                    Интересные проекты
                </Title>

                {(profile.following.length === 0) ? (
                    <Box
                        className={s.section}
                    >
                        <Alert
                            icon={(
                                <IconAlertCircle size={16} />
                            )}
                            variant="filled"
                            title="Проектов нет"
                            color="teal"
                            radius="md"
                            sx={{
                                maxWidth: 520,
                            }}
                        >
                            Вы не подписаны ни на один проект. Найдите для себя что-то интересное на главной странице или карте
                        </Alert>
                    </Box>
                ) : (
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
                    </SimpleGrid>
                )}
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

    return {
        props: {
            profile,
        },
    }
}

export default ProfilePage
