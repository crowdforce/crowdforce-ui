import { useRouter } from "next/router"
import Page from "@/components/Page"
import useSWR, { SWRConfig } from "swr"
import { Box, Center, Loader } from "@mantine/core"
import { MapProvider } from "react-map-gl"
import type { GetServerSideProps } from "next"
import SchemaMap from "@/components/SchemaMap"
import { getProject } from "pages/api/projects/[projectId]"
import { ProjectSideMenu, ProjectSideMenuIds } from "@/components/ProjectSideMenu"
import { useEffect, useState } from "react"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ProjectAside } from "@/components/ProjectAside"
import { useMediaQuery } from "@mantine/hooks"
import { getTasks } from "pages/api/projects/[projectId]/tasks"
import { ProjectTaskContext } from "@/contexts/projectTask"
import type { Dto, ProjectDto, ProjectTaskDto } from "@/common/types"
import { Permission } from "@/common/types"
import { NextPageWithLayout } from "pages/_app"
import { App } from "@/components/App"

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
    const canEdit = data?.permission === Permission.edit
    const isInit = canEdit && Boolean(router.query.init)
    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState<Exclude<ProjectSideMenuIds, "aside">>(isInit ? "edit" : "info")
    const [task, setTask] = useState<Partial<ProjectTaskDto> | null>(null)
    const smallerThanSm = useMediaQuery("(max-width: 800px)", false)
    const [wide, setWide] = useState(!smallerThanSm)
    useEffect(() => {
        setWide(!smallerThanSm)
    }, [smallerThanSm])

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
        <Box
            sx={{
                position: "relative",
                display: "flex",
            }}
        >
            <ProjectSideMenuContext.Provider
                value={{ open, setOpen, openId, setOpenId, wide, setWide, isAdmin: canEdit, isInit }}
            >
                <ProjectTaskContext.Provider
                    value={{ task, setTask }}
                >
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <ProjectSideMenu />
                        <ProjectAside
                            title={data.payload.title}
                            followers={data.payload.followers}
                        />
                    </Box>

                    <Box
                        sx={{
                            flex: "1 1 100%",
                            position: "relative",
                            height: "calc(100vh - 60px)",
                            display: "flex",
                        }}
                    >
                        <MapProvider>
                            <SchemaMap
                                id={"schema"}
                                projectId={projectId}
                                renderSchema={openId !== "schema"}
                            />
                        </MapProvider>
                    </Box>
                </ProjectTaskContext.Provider>
            </ProjectSideMenuContext.Provider>
        </Box>
    )
}

const Index: NextPageWithLayout<Props> = ({ fallback }) => (
    <SWRConfig value={{ fallback }}>
        <Container />
    </SWRConfig>
)

Index.getLayout = function getLayout(page) {
    return (
        <App showFooter={false}>
            <MapProvider>
                <Page>
                    {page}
                </Page>
            </MapProvider>
        </App>
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
