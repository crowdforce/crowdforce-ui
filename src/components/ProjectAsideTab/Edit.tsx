import { Aside, createStyles, ScrollArea } from "@mantine/core"
import React from "react"

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

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            
        </Aside.Section>
    )
}
