import { Dto, ProjectDto } from "@/common/types"
import { Text, Stack, Loader, Image, Group, Flex } from "@mantine/core"
import { useAuthenticated } from "@/hooks/useAuthenticated"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { FollowProjectButton } from "../FollowProjectButton"
import Link from "next/link"

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
        <Flex direction='column' style={{ height: "100%" }}>
            <Image
                src={data?.payload.imageUrl ?? "/wip.png"}
                alt={data.payload.title}
                radius="md"
            />

            <Group
                noWrap
                py='sm'
                px='sm'
            >
                {/* <IconMapPin
                            className={s.icon}
                        /> */}
                <Stack
                    spacing='xs'
                >
                    {data.payload.address && (
                        <Text
                            color='dimmed'
                        >
                            {data.payload.address}
                        </Text>
                    )}
                    <Group
                        noWrap
                        spacing='xs'
                    // className={s.ownerAndLink}
                    >
                        {data.payload.permalink && (
                            <Link href={data.payload.permalink} passHref>
                                <Text
                                    color='dimmed'
                                    component='a'
                                    underline
                                >
                                    {data.payload.permalink}
                                </Text>
                            </Link>
                        )}
                    </Group>
                </Stack>
            </Group>

            <Text>
                {data?.payload.description}
            </Text>

            <div style={{ flex: 1 }} />

            <FollowProjectButton
                disabled={!data || data.payload.followingStatus === "unavailable" || isUnauthenticated}
                size='xl'
                fullWidth
                status={data?.payload.followingStatus === "following" ? true : false}
                projectId={data?.payload.id ?? ""}
            />
        </Flex>
    )
}
