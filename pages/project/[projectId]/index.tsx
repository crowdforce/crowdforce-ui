import { useRouter } from 'next/router'
import Page from '@/components/Page'
import useSWR, { SWRConfig } from 'swr'
import { Aside, Center, Group, Loader, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { ProjectDto } from '@/common/types'
import { MapProvider } from 'react-map-gl'
import type { GetServerSideProps, NextPage } from 'next'
import SchemaMap from '@/components/SchemaMap'
import { getProject } from 'pages/api/projects/[projectId]'
import { ProjectSideMenu } from '@/components/ProjectSideMenu'
import { IconUsers } from '@tabler/icons'
import { useState } from 'react'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'

type Props = {
    fallback: Record<string, any>
}

const Container: React.FC = () => {
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data, error } = useSWR<ProjectDto>(`/api/projects/${projectId}`)

    const [open, setOpen] = useState(true)
    const [openId, setOpenId] = useState('info')

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

    // <FollowProjectButton
    //     status={data.isFollowed}
    //     projectId={projectId}
    // />

    return (
        <Page>
            <div style={{
                position: 'relative',
                display: 'flex',
            }}>
                <ProjectSideMenuContext.Provider
                    value={{ open, setOpen, openId, setOpenId }}
                >
                    <ProjectSideMenu />
                    <Aside
                        fixed
                        position={{
                            left: open ? 50 : -570,
                        }}
                        height='calc(100% - 60px)'
                        width={{
                            base: 'calc(100% - 50px)',
                            xs: 520,
                        }}
                        sx={{
                            transition: 'left .25s',
                        }}
                    >
                        <Aside.Section
                            p='xs'
                        >
                            <Group
                                position='apart'
                                align='start'
                                noWrap
                            >
                                <Title order={4}>
                                    {data.title}
                                </Title>
                                <Group
                                    noWrap
                                    grow
                                    spacing='xs'
                                    sx={{
                                        flex: '0 0 auto',
                                    }}
                                >
                                    <IconUsers />
                                    <div>
                                        69
                                    </div>
                                </Group>
                            </Group>
                        </Aside.Section>
                        <Aside.Section
                            grow
                            component={ScrollArea}
                            px='xs'
                        >
                            {[1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,].map((x, i) => (
                                <Text>
                                    {data.description}
                                </Text>
                            ))}
                        </Aside.Section>
                    </Aside>
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
