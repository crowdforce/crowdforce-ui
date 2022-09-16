import { useRouter } from "next/router"
import Page from "@/components/Page"
import useSWR, { SWRConfig } from "swr"
import { Box, Center, Loader } from "@mantine/core"
import { MapProvider } from "react-map-gl"
import type { GetServerSideProps, NextPage } from "next"
import SchemaMap from "@/components/SchemaMap"
import { getProject } from "pages/api/projects/[projectId]"
import { ProjectSideMenu, ProjectSideMenuIds } from "@/components/ProjectSideMenu"
import { useEffect, useState } from "react"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ProjectAside } from "@/components/ProjectAside"
import { useMediaQuery } from "@mantine/hooks"
import { getTasks, ProjectTask } from "pages/api/projects/[projectId]/tasks"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { ProjectTaskContext } from "@/contexts/projectTask"

type Props = {
    fallback: Record<string, any>
}

export type ProjectData = {
    id: string
    title: string
    description: string
    imageUrl: string | null
    isFollowed: boolean | null
    address: string
    link: string
    admin: Partial<User>
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
    const { data } = useSWR<ProjectData>(`/api/projects/${projectId}`)
    const session = useSession()
    const isAdmin = session.data?.user?.role == "Admin"
    const isInit = isAdmin && Boolean(router.query.init)
    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState<Exclude<ProjectSideMenuIds, "aside">>(isInit ? "edit" : "info")
    const [task, setTask] = useState<Partial<ProjectTask> | null>(null)
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
        <Page>
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                }}
            >
                <ProjectSideMenuContext.Provider
                    value={{ open, setOpen, openId, setOpenId, wide, setWide, isAdmin, isInit }}
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
                                data={data}
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
                                />
                            </MapProvider>
                        </Box>
                    </ProjectTaskContext.Provider>
                </ProjectSideMenuContext.Provider>
            </Box>
        </Page>
    )
}

const Index: NextPage<Props> = ({ fallback }) => (
    <SWRConfig value={{ fallback }}>
        <Container />
    </SWRConfig>
)

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
