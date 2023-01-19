import Link from "next/link"
import { Badge, Group } from "@mantine/core"
import Crowdforce from "./logo.svg"

export const Logo = () => (
    <Link href={"/"} passHref>
        <Group
            noWrap
            sx={{
                userSelect: "none",
                cursor: "pointer",
                gap: 0,
            }}
        >
            <Crowdforce height={32} />
            <Badge>Beta</Badge>
        </Group>
    </Link>
)
