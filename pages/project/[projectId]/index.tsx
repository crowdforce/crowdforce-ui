import { useRouter } from 'next/router'
import Page from '@/components/Page'
import useSWR, { SWRConfig } from 'swr'
import { Box, Center, Grid, Loader, Stack, Text, Title } from '@mantine/core'
import { ProjectDto } from '@/common/types'
import { MapProvider } from 'react-map-gl'
import type { GetServerSideProps, NextPage } from 'next'
import SchemaMap from '@/components/SchemaMap'
import { FollowProjectButton } from '@/components/FollowProjectButton'
import { getProject } from 'pages/api/projects/[projectId]'

type Props = {
    fallback: Record<string, any>
}

const Container: React.FC = () => {
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data, error } = useSWR<ProjectDto>(`/api/projects/${projectId}`)

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
            <Grid>
                <Stack>
                    <Title>{data.title}</Title>
                    <Text>{data.description} </Text>
                    {/* <Grid.Col xs={12} md={8}> */}
                    <FollowProjectButton
                        status={data.isFollowed}
                        projectId={projectId}
                    />
                    <Box sx={{ height: 600 }}>
                        <MapProvider>
                            <SchemaMap
                                id={'schema'}
                                projectId={projectId}
                            />
                        </MapProvider>
                    </Box>
                    {/* </Grid.Col> */}
                </Stack>
            </Grid>
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

    return {
        props: {
            fallback: {
                [`/api/projects/${projectId}`]: project,
            },
        }
    }
}

export default Index
