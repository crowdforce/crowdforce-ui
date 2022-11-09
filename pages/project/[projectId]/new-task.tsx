import { useRouter } from "next/router"
import useSWR, { SWRConfig } from "swr"
import { Center, Loader } from "@mantine/core"
import type { GetServerSideProps } from "next"
import { getProject } from "pages/api/projects/[projectId]"
import { ProjectAside } from "@/components/ProjectAside"
import { getTasks } from "pages/api/projects/[projectId]/tasks"
import type { Dto, ProjectDto } from "@/common/types"
import { NextPageWithLayout } from "pages/_app"
import { ProjectLayout } from "@/components/ProjectLayout"
import { AddTask } from "@/components/ProjectAsideTab/AddTask"

type Props = {
    fallback: Record<string, any>
}

export type AdminProjectData = {
    id: string
    title: string
    description: string
    status: string
    viewport: {
        lng: number
        lat: number
        zoom: number
    }
}

const Container: React.FC = () => {
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data } = useSWR<Dto<ProjectDto>>(`/api/projects/${projectId}`)

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
            <AddTask />
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
        <ProjectLayout>
            {page}
        </ProjectLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const projectId = ctx.params?.projectId as string
    const project = await getProject(projectId)
    const tasks = await getTasks(projectId)

    return {
        props: {
            fallback: {
                [`/api/projects/${projectId}`]: project,
                [`/api/projects/${projectId}/tasks`]: tasks,
            },
        },
    }
}

export default Index
