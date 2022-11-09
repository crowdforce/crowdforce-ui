import { useRouter } from "next/router"
import useSWR from "swr"
import { Box } from "@mantine/core"
import SchemaMap from "@/components/SchemaMap"
import { ProjectSideMenu, ProjectSideMenuIds } from "@/components/ProjectSideMenu"
import { useEffect, useState } from "react"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { useMediaQuery } from "@mantine/hooks"
import type { Dto, ProjectDto } from "@/common/types"
import { Permission } from "@/common/types"
import { App } from "../App"
import { MapProvider } from "react-map-gl"

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

export type ProjectLayoutProps = {
    children: React.ReactNode
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({ children }) => {
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data } = useSWR<Dto<ProjectDto>>(`/api/projects/${projectId}`)
    const canEdit = data?.permission === Permission.edit
    const isInit = canEdit && Boolean(router.query.init)
    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState<ProjectSideMenuIds>(isInit ? "edit" : "info")
    const smallerThanSm = useMediaQuery("(max-width: 800px)", false)
    const [wide, setWide] = useState(!smallerThanSm)

    useEffect(() => {
        setWide(!smallerThanSm)
    }, [smallerThanSm])

    return (
        <App showFooter={false}>
            <MapProvider>
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                    }}
                >
                    <ProjectSideMenuContext.Provider
                        value={{ open, setOpen, openId, setOpenId, wide, setWide, isAdmin: canEdit, isInit }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <ProjectSideMenu />
                            {children}
                        </Box>

                        <Box
                            sx={{
                                flex: "1 1 100%",
                                position: "relative",
                                height: "calc(100vh - 60px)",
                                display: "flex",
                            }}
                        >
                            <SchemaMap
                                id={"schema"}
                                projectId={projectId}
                                renderSchema={true}
                            />
                        </Box>
                    </ProjectSideMenuContext.Provider>
                </Box>
            </MapProvider>
        </App>
    )
}
