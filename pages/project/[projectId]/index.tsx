import { useRouter } from "next/router"
import Page from "@/components/Page"
import useSWR, { SWRConfig } from "swr"
import { Center, Loader } from "@mantine/core"
import { MapProvider } from "react-map-gl"
import type { GetServerSideProps, NextPage } from "next"
import SchemaMap from "@/components/SchemaMap"
import { getProject } from "pages/api/projects/[projectId]"
import { ProjectSideMenu, ProjectSideMenuIds } from "@/components/ProjectSideMenu"
import { useEffect, useState } from "react"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ProjectAside } from "@/components/ProjectAside"
import { getAdminProject } from "pages/api/admin/projects/[projectId]"
import { useMediaQuery } from "@mantine/hooks"
import { getTasks } from "pages/api/projects/[projectId]/tasks"
import { getFeatures } from "pages/api/admin/projects/[projectId]/features"
import { User } from "@prisma/client"

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
    const { data, error } = useSWR<ProjectData>(`/api/projects/${projectId}`)
    const { data: adminData, error: adminError } = useSWR<AdminProjectData>(`/api/admin/projects/${projectId}`)
    const isAdmin = Boolean(adminData && !(adminData as any)?.error)
    const isInit = isAdmin && adminData?.status == "Init"

    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState<Exclude<ProjectSideMenuIds, "aside">>("info")
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
            <div style={{
                position: "relative",
                display: "flex",
            }}>
                <ProjectSideMenuContext.Provider
                    value={{ open, setOpen, openId, setOpenId, wide, setWide, isAdmin, isInit }}
                >
                    <div style={{
                        position: "relative",
                    }}>
                        <ProjectSideMenu />
                        <ProjectAside
                            data={data}
                        />
                    </div>

                    <div
                        style={{
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
                    </div>
                </ProjectSideMenuContext.Provider>
            </div>
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
    const adminProject = await getAdminProject(projectId)
    const features = await getFeatures(projectId)

    return {
        props: {
            fallback: {
                [`/api/projects/${projectId}`]: project,
                [`/api/projects/${projectId}/tasks`]: tasks,
                [`/api/admin/projects/${projectId}`]: adminProject,
                [`/api/admin/projects/${projectId}/features`]: features,
            },
        },
    }
}

export default Index
