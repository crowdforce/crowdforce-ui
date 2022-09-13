import { Aside, createStyles, ScrollArea } from "@mantine/core"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"

type ProjectEditProps = {

}

const useStyles = createStyles((theme) => ({
    aside: {
        position: "sticky",
        borderRadius: theme.radius.lg,
        margin: theme.spacing.xs,
    },
}))

export const Edit: React.FC<ProjectEditProps> = () => {
    const { classes: s, cx } = useStyles()

    const router = useRouter()
    const { data: dataPublic, error: errorPublic } = useSWR(`/api/projects/${router.query.projectId}`)
    const { data, error } = useSWR(`/api/admin/projects/${dataPublic?.id}`)

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            PUBLIC DATA
            <pre>
                {JSON.stringify(dataPublic, null, 3)}
            </pre>
            ADMIN DATA
            <pre>
                {JSON.stringify(data, null, 3)}
            </pre>
        </Aside.Section>
    )
}
