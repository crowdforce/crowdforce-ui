import Link from "next/link"
import { Badge, Group, useMantineTheme } from "@mantine/core"
import Crowdforce from "./logo.svg"

export const Logo = () => {
    const theme = useMantineTheme()

    return (
        <Link href={"/"} passHref>
            <Group
                noWrap
                sx={{
                    userSelect: "none",
                    cursor: "pointer",
                    gap: 0,
                }}
            >
                <Crowdforce height={32} fill={theme.colorScheme === "dark" ? "#FFFFFF" : "#16171B"} />
                <Badge>Beta</Badge>
            </Group>
        </Link>
    )
}
