import { Dto, ProjectDto } from "@/common/types"
import { Aside, ScrollArea, Text, Stack, Loader, Image } from "@mantine/core"
import { useAuthenticated } from "@/hooks/useAuthenticated"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { FollowProjectButton } from "../FollowProjectButton"

type ProjectInfoProps = {

}

export const Info: React.FC<ProjectInfoProps> = () => {
    const router = useRouter()
    const { data } = useSWR<Dto<ProjectDto>>(`/api/projects/${router.query.projectId}`)
    const isUnauthenticated = useAuthenticated()

    if (!data) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Aside.Section
                grow
                component={ScrollArea}
                px='md'
            >
                <Stack>
                    <Image
                        src={data?.payload.imageUrl ?? "/wip.png"}
                        alt={data.payload.title}
                        radius="md"
                    />

                    {/* <Group
                        noWrap
                        py='sm'
                        px='sm'
                    >
                        <IconMapPin
                            className={s.icon}
                        />
                        <Stack
                            spacing='xs'
                        >
                            {data?.address && (
                                <Text
                                    color='dimmed'
                                >
                                    {data.address}
                                </Text>
                            )}
                            <Group
                                noWrap
                                spacing='xs'
                                className={s.ownerAndLink}
                            >
                                <Text
                                    color='dimmed'
                                >
                                    {data.admin.name}
                                </Text>
                                {data?.link && (
                                    <Link href={data.link} passHref>
                                        <Text
                                            color='dimmed'
                                            component='a'
                                            underline
                                        >
                                            {data.link}
                                        </Text>
                                    </Link>
                                )}
                            </Group>
                        </Stack>
                    </Group> */}
                    <Text
                    // p={"md" }
                    >
                        {data?.payload.description}
                    </Text>
                </Stack>
            </Aside.Section>

            <Aside.Section p='md' >
                <FollowProjectButton
                    disabled={!data || data.payload.followingStatus === "unavailable" || isUnauthenticated}
                    size='xl'
                    fullWidth
                    status={data?.payload.followingStatus === "following" ? true : false}
                    projectId={data?.payload.id ?? ""}
                />
            </Aside.Section>
        </>
    )
}
