import Link from "next/link"
import { Badge, Group } from "@mantine/core"
import logo from "@/../public/logo.svg"
import Image from "next/image"

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
            <div style={{
                position: "relative",
                height: 40,
                display: "flex",
                maxWidth: 150,
            }}>
                <Image
                    src={logo}
                    quality={100}
                    alt='crowdforce logo'
                />
            </div>
            <Badge>Beta</Badge>
        </Group>
    </Link>
)
