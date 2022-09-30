import Page from "@/components/Page"
import { createStyles, Stack, Title, SimpleGrid } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { getUserId } from "@/server/lib"
import { getOwnProjects } from "@/server/controllers/profile/projects"
import { ProjectAddCard } from "@/components/ProjectAddCard"
import greenLine from "@/../public/index/heroLine.svg"
import blueLine from "@/../public/index/blueLine.svg"
import Image from "next/image"
import useSWR from "swr"
import { ProjectDto } from "@/common/types"
import { AdminProjectCard } from "@/components/AdminProjectCard"

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
    const { classes: s, cx } = useStyles()
    const { data: own } = useSWR<ProjectDto[]>("/api/profile/projects")

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
                        <AdminProjectCard
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

    return {
        props: {
            fallback: {
                "/api/profile/projects": projects,
            },
        },
    }
}

export default ProfilePage
