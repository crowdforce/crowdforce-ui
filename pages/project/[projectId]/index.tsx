import { useRouter } from 'next/router'
import Page from '@/components/Page'
import useSWR, { SWRConfig } from 'swr'
import { Center, Loader } from '@mantine/core'
import { ProjectDto } from '@/common/types'
import { MapProvider } from 'react-map-gl'
import type { GetServerSideProps, NextPage } from 'next'
import SchemaMap from '@/components/SchemaMap'
import { getProject } from 'pages/api/projects/[projectId]'
import { ProjectSideMenu, ProjectSideMenuIds } from '@/components/ProjectSideMenu'
import { useState } from 'react'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { ProjectAside } from '@/components/ProjectAside'

type Props = {
    fallback: Record<string, any>
}

const Container: React.FC = () => {
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data, error } = useSWR<ProjectDto>(`/api/projects/${projectId}`)

    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState<Exclude<ProjectSideMenuIds, 'aside'>>('info')

    if (!data) {
        return (
            <Center
                sx={{
                    height: '100%',
                }}
            >
                <Loader />
            </Center>
        )
    }

    return (
        <Page>
            <div style={{
                position: 'relative',
                display: 'flex',
            }}>
                <ProjectSideMenuContext.Provider
                    value={{ open, setOpen, openId, setOpenId }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        height: '100%',
                    }}>
                        <ProjectSideMenu />

                        <ProjectAside
                            data={data}
                        />
                    </div>

                    <div
                        style={{
                            flex: '1 0 100%',
                            position: 'relative',
                            height: 'calc(100vh - 60px)',
                            zIndex: 0,
                        }}
                    >
                        <MapProvider>
                            <SchemaMap
                                id={'schema'}
                                projectId={projectId}
                            />
                        </MapProvider>
                    </div>
                </ProjectSideMenuContext.Provider>
            </div>
        </Page >
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

    return {
        props: {
            fallback: {
                [`/api/projects/${projectId}`]: project,
            },
        }
    }
}

export default Index
