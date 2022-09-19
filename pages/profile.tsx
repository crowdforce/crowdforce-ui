import { useSession } from "next-auth/react"
import Page from "@/components/Page"
import { Avatar, Card, createStyles, Group, Stack, Title } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getProjects, ProfileResponseDto } from "@/server/controllers/profile"
import { ProjectCard } from "@/components/ProjectCard"

const useStyles = createStyles((theme) => ({
    bigGroup: {
        alignItems: "flex-start",
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "stretch",
            "& div": {
                maxWidth: "unset",
            },
        },
    },
    generalInfo: {
        flexGrow: "initial",
        marginRight: "auto",
        [theme.fn.smallerThan("sm")]: {
            marginRight: "unset",
        },
    },
}))

type Props = {
    profile: ProfileResponseDto
}

const ProfilePage: NextPage<Props> = props => {
    const session = useSession()
    const { classes: s } = useStyles()

    return (
        <Page>
            <Group
                noWrap
                grow
                className={s.bigGroup}
            >
                <Card
                    withBorder
                    p='lg'
                    className={s.generalInfo}
                >
                    <Group position='center'>
                        <Stack>
                            <Avatar src={session.data?.user?.image!} size={256} radius={"50%" as any} />
                            <Title order={1}>
                                {session.data?.user?.name!}
                            </Title>
                        </Stack>
                    </Group>
                </Card>
                <Card withBorder>
                    <Card.Section
                        withBorder
                        inheritPadding
                        py='inherit'
                    >
                        <Title order={2}>
                            Проекты за которыми вы следите
                        </Title>
                    </Card.Section>
                    <Stack
                        py='inherit'
                    >
                        {props.profile.following.map(({ id, title, description, imageUrl }) => (
                            <ProjectCard
                                key={id}
                                coverSrc={imageUrl}
                                title={title}
                                description={description}
                                href={`/project/${id}`}
                            />
                        ))}
                    </Stack>
                </Card>
                <Card withBorder>
                    <Card.Section
                        withBorder
                        inheritPadding
                        py='inherit'
                    >
                        <Title order={2}>
                            Проекты которые вы курируете
                        </Title>
                    </Card.Section>
                    <Stack
                        py='inherit'
                    >
                        {props.profile.owned.map(({ id, title, description, imageUrl }) => (
                            <ProjectCard
                                key={id}
                                coverSrc={imageUrl}
                                title={title}
                                description={description}
                                href={`/project/${id}`}
                            />
                        ))}
                    </Stack>
                </Card>
            </Group>
        </Page>
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
