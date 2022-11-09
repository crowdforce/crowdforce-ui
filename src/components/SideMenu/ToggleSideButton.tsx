import { createStyles } from "@mantine/core"
import { SideButton } from "./SideButton"
import type { SideButtonProps } from "./SideButton"

type ToggleSideButtonProps = Omit<SideButtonProps, "children" | "active"> & {
    open: boolean
    children: [string, string]
}

const useStyles = createStyles((theme) => ({
    open: {
        "& svg": {
            transform: "rotate(-180deg)",
        },
    },
}))

export const ToggleSideButton: React.FC<ToggleSideButtonProps> = ({ open, children, ...props }) => {
    const { classes: s } = useStyles()

    return (
        <SideButton
            {...props}
            className={open ? s.open : undefined}
        >
            {open ? children[0] : children[1]}
        </SideButton>
    )
}
