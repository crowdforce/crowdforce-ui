import { useRouter } from "next/router"
import Page from "@/components/Page"
import useSWR, { SWRConfig, useSWRConfig } from "swr"
import { Alert, Button, Card, Center, Grid, Loader, Stack, Text } from "@mantine/core"
import { ProjectEditForm } from "@/components/ProjectEditForm"
import { AdminFeatureDto, AdminProjectDto, NewProjectDto } from "@/common/types"
import { useCallback } from "react"
import { useSession } from "next-auth/react"
import { ProjectMapEditor } from "@/components/ProjectMapEditor"
import { MapProvider } from "react-map-gl"
import { getUserId } from "@/server/lib"
import type { GetServerSideProps, NextPage } from "next"
import { getAdminProject } from "pages/api/admin/projects/[projectId]"

type Props = {
    fallback: Record<string, any>
}

const Container: React.FC = () => {
    const session = useSession()
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { mutate } = useSWRConfig()
    const isLoadingAuth = session.status === "loading"
    const isAuthenticated = session.status === "authenticated"
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${projectId}`)

    const isReadyToPublish = false
    // [
    //     data?.title,
    //     data?.description,
    //     features?.length
    // ]
    //     .every((x) => Boolean(x))

    const onPublish = useCallback(
        () => {
            // fetch(
            //     `/api/admin/projects/${projectId}/update`,
            //     {
            //         method: 'PUT',
            //         body: JSON.stringify(data),
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     }
            // )
            //     .then(async res => {
            //         if (res.ok && res.status == 200) {
            //             return await res.json()
            //         } else {
            //             throw Error(res.statusText)
            //         }
            //     })
            //     .then((res: NewProjectDto) => {
            //         mutate(`/api/admin/projects/${data.id}`)
            //     })
            //     .catch(e => {
            //         console.log('API error: ', e)
            //     })
        },
        [data]
    )

    if (error) {
        return (
            <Page>
                <Alert
                    title='Ошибка!'
                    color='red'
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 9v2m0 4v.01" />
                            <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                        </svg>
                    }
                >
                    Что-то поломалось ): <br />
                    Мы пытаемся загрузить еще раз. если вы видите это не первый раз, то напишите нам.
                </Alert>
            </Page>
        )
    }

    if (!data || isLoadingAuth) {
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
            <Grid>
                <Grid.Col xs={12} md={4}>
                    <Stack>
                        <Card
                            withBorder
                        >
                            <ProjectEditForm
                                data={data}
                            />
                        </Card>
                        <Card withBorder>
                            {data.status === "Init" && (
                                <Button
                                    fullWidth
                                    onClick={onPublish}
                                    disabled={!isReadyToPublish}
                                >
                                    Опубликовать
                                </Button>
                            )}
                        </Card>
                    </Stack>
                </Grid.Col>
                <Grid.Col xs={12} md={8}>
                    <MapProvider>
                        <ProjectMapEditor
                            projectId={projectId}
                        />
                    </MapProvider>
                </Grid.Col>
            </Grid>
        </Page>
    )
}

const ProjectEditPage: NextPage<Props> = ({ fallback }) => (
    <SWRConfig value={{ fallback }}>
        <Container />
    </SWRConfig>
)

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
                [`/api/admin/projects/${projectId}`]: project,
            },
        },
    }
}

export default ProjectEditPage
