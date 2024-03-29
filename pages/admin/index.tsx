import Page from "@/components/Page"
import { createStyles, Stack, Title } from "@mantine/core"
import { GetServerSideProps } from "next"
import { hasAdminRole } from "@/server/lib"
import Link from "next/link"
import { NextPageWithLayout } from "pages/_app"
import { App } from "@/components/App"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },
}))

type Props = {
}

const Index: NextPageWithLayout<Props> = () => {
    const { classes: s } = useStyles()

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
                <Link href={"/admin/projects"}>
                    <a>Проекты</a>
                </Link>
            </Stack>
        </Page >
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <App showFooter>
            {page}
        </App>
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

    return {
        props: {
        },
    }
}

export default Index
