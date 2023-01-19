import dynamic from "next/dynamic"
import { createStyles, Group, Header, MediaQuery } from "@mantine/core"
import { Logo } from "@/components/Logo"
import { AppMenu } from "../AppMenu"
import { UserButtonProps } from "@/components/UserButton"

const UserButton = dynamic<UserButtonProps>(
    () => import("@/components/UserButton").then(x => x.UserButton),
    {
        ssr: false,
    }
)

type AppHeaderProps = {
    burger: React.ReactNode
}

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
    },
}))

export const AppHeader: React.FC<AppHeaderProps> = ({ burger }) => {
    const { classes: s } = useStyles()
    return (
        <Header
            height={56}
            withBorder={false}
            pl={"sm"}
            className={s.header}
        >
            <Logo />

            <MediaQuery smallerThan='xs' styles={{ display: "none" }}>
                <Group
                    noWrap
                >
                    <AppMenu />
                    <UserButton />
                </Group>
            </MediaQuery>

            <MediaQuery largerThan='xs' styles={{ display: "none" }}>
                {burger}
            </MediaQuery>
        </Header>
    )

}
