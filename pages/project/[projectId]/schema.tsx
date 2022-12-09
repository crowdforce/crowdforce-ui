import { useRouter } from "next/router"
import useSWR, { SWRConfig } from "swr"
import { Center, Flex, Loader } from "@mantine/core"
import { Dto, ProjectDto } from "@/common/types"
import { getUserId } from "@/server/lib"
import type { GetServerSideProps } from "next"
import { getAdminProject } from "pages/api/edit/projects/[projectId]"
import { NextPageWithLayout } from "pages/_app"
import { ProjectLayout } from "@/components/ProjectLayout"
import { ProjectAside } from "@/components/ProjectAside"
import { ProjectSchemaLegend } from "@/components/ProjectSchemaLegend"
import { ProjectMapEditor } from "@/components/ProjectMapEditor"
import { ProjectSchemaDraw } from "@/components/ProjectSchemaDraw"

type Props = {
    fallback: Record<string, any>
}

const Container: React.FC = () => {
    // const session = useSession()
    const router = useRouter()
    const projectId = router.query.projectId as string

    // const isLoadingAuth = session.status === "loading"
    // const { data, error } = useSWR<EditProjectDto>(`/api/edit/projects/${projectId}`)
    const { data } = useSWR<Dto<ProjectDto>>(`/api/projects/${projectId}`)

    // if (error) {
    //     return (
    //         <Alert
    //             title='Ошибка!'
    //             color='red'
    //             icon={
    //                 <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //                     <path d="M12 9v2m0 4v.01" />
    //                     <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    //                 </svg>
    //             }
    //         >
    //             Что-то поломалось ): <br />
    //             Мы пытаемся загрузить еще раз. если вы видите это не первый раз, то напишите нам.
    //         </Alert>
    //     )
    // }

    if (!data) {
        return (
            <Center
                sx={{
                    height: "100%",
                }}
            >
                <Loader />
            </Center>
        )
    }

    return (
        <ProjectAside
            title={data.payload.title}
            followers={data.payload.followers}
        >
            <Flex direction={"column"} gap={"md"}>
                <ProjectSchemaLegend
                    projectId={projectId}
                />
                <ProjectMapEditor
                    projectId={projectId}
                />
            </Flex>
        </ProjectAside>
    )
}

const Index: NextPageWithLayout<Props> = ({ fallback }) => (
    <SWRConfig value={{ fallback }}>
        <Container />
    </SWRConfig>
)

Index.getLayout = function getLayout(page) {
    return (
        <ProjectLayout
            map={(
                <ProjectSchemaDraw />
            )}
        >
            {page}
        </ProjectLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const userId = await getUserId(ctx)
    if (!userId) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        }
    }

    const projectId = ctx.params?.projectId as string
    const project = await getAdminProject(projectId)

    return {
        props: {
            fallback: {
                [`/api/edit/projects/${projectId}`]: project,
            },
        },
    }
}

export default Index
