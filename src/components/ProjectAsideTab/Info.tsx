import { Dto, ProjectDto } from "@/common/types"
import { Aside, createStyles, ScrollArea, Text, Stack, Loader } from "@mantine/core"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { FollowProjectButton } from "../FollowProjectButton"

type ProjectInfoProps = {

}

const useStyles = createStyles((theme) => ({
    cover: {
        borderRadius: theme.radius.md,
    },
    icon: {
        flex: "0 0 auto",
        color: theme.colors.gray[6], // dimmed color
    },
    ownerAndLink: {
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
}))

export const Info: React.FC<ProjectInfoProps> = () => {
    const { classes: s } = useStyles()
    const router = useRouter()
    const { data } = useSWR<Dto<ProjectDto>>(`/api/projects/${router.query.projectId}`)
    const session = useSession()
    const isUnauthenticated = session.status == "unauthenticated"

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
                        className={s.cover}
                        alt={data.payload.title}
                        layout={"responsive"}
                        width={16}
                        height={10}
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

            {isUnauthenticated ? null : (
                <Aside.Section p='md' >
                    <FollowProjectButton
                        size='xl'
                        fullWidth
                        status={data?.payload.isFollowed ?? null}
                        projectId={data?.payload.id ?? ""}
                    />
                </Aside.Section>
            )}
        </>
    )
}
