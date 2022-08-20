import { useRouter } from 'next/router'
import Page from 'components/Page/Page'
import useSWR, { useSWRConfig } from 'swr'
import { Alert, Button, Card, Center, Grid, Loader, Stack } from '@mantine/core'
import { ProjectEditForm } from '@/components/ProjectEditForm'
import { NewProjectDto } from '@/common/types'
import { useCallback } from 'react'

const ProjectEditPage = () => {
    const { query } = useRouter()
    const { mutate } = useSWRConfig()
    const { data, error } = useSWR([
        `/api/admin/projects/${query.id}`,
        {
            method: 'GET',
        },
    ])
    const { data: mapData, error: mapError } = useSWR([
        `/api/admin/projects/${query.id}/features`,
        {
            method: 'GET',
        },
    ])

    const isReadyToPublish = [
        data?.title,
        data?.description,
        mapData?.length
    ]
        .every((x) => Boolean(x))

    const onPublic = useCallback(
        () => {
            fetch(
                `/api/admin/projects/${query.id}/update`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(async res => {
                    if (res.ok && res.status == 200) {
                        return await res.json()
                    } else {
                        throw Error(res.statusText)
                    }
                })
                .then((res: NewProjectDto) => {
                    mutate(`/api/admin/projects/${data.id}`)
                })
                .catch(e => {
                    console.log('API error: ', e)
                })
        },
        [data]
    )


    if (error || data?.error) {
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
                <Grid.Col xs={12} md={6}>
                    <Stack>
                        <Card
                            withBorder
                        >
                            <ProjectEditForm
                                data={data}
                            />
                        </Card>
                    </Stack>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <Card
                        withBorder
                    >
                        PROJECT MAP EDITOR PLACEHOLDER
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    {data.status === 'Init' && (
                        <Button
                            fullWidth
                            onClick={onPublic}
                            disabled={!isReadyToPublish}
                        >
                            Опубликовать
                        </Button>
                    )}
                </Grid.Col>
            </Grid>
        </Page>
    )
}

export default ProjectEditPage