import Page from "@/components/Page"
import { createStyles, Stack, Title, Loader, Breadcrumbs, Anchor, Group } from "@mantine/core"
import { GetServerSideProps, NextPage } from "next"
import { hasAdminRole } from "@/server/lib"
import useSWR from "swr"
import { AdminProjectDto } from "@/common/types"
import { AdminProjectsTable } from "@/components/AdminProjectsTable"
import { getAllProjects } from "@/server/controllers/admin/projects"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },
}))

type Props = {
}

const Index: NextPage<Props> = () => {
    const { classes: s } = useStyles()
    const { data: items } = useSWR<AdminProjectDto[]>("/api/admin/projects", null, {
        fallback: [],
    })

    const crumbs = [
        { title: "Admin", href: "/admin" },
        { title: "Projects", href: "#" },
    ].map((item, index) => (
        <Link href={item.href} key={index}>
            <a>
                {item.title}
            </a>
        </Link>
    ))

    return (
        <Page>
            <Stack
                align="center"
                spacing="xl"

            >
                <Group>
                    <Breadcrumbs>{crumbs}</Breadcrumbs>
                </Group>
                <Title
                    className={s.section}
                    mt="xl"
                >
                    Проекты
                </Title>
                {!items ? (
                    <Loader />
                ) : (
                    <AdminProjectsTable items={items} />
                )}
            </Stack>
        </Page >
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const isAdmin = await hasAdminRole(ctx.req as any, ctx.res as any)
    if (!isAdmin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const projects = await getAllProjects()

    return {
        props: {
            fallback: {
                "/api/admin/projects": projects,
            },
        },
    }
}

export default Index
