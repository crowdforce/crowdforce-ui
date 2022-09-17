import { createStyles, Footer, Group } from "@mantine/core"
import { MenuItem } from "../AppMenu/MenuItem"

const useStyles = createStyles((theme) => ({
    footer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
    },
    root: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1160,
        "& a": {
            color: "#362034",
            textDecoration: "none",
            fontSize: "15px",
            margin: "0 20px",
        },
    },
    mobileCol: {
        display: "flex",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
}))

export const AppFooter: React.FC = () => {
    const { classes: s, cx } = useStyles()
    return (
        <Footer
            height={60}
            p={"sm"}
            className={s.footer}
        >
            <Group
                className={cx(s.root, s.mobileCol)}
            >
                <span>
                    2022 © crowd<b>force</b>
                </span>
                <nav>
                    <Group
                        className={s.mobileCol}
                    >
                        <MenuItem href="/map">Карта</MenuItem>
                        <MenuItem href="/wiki">База знаний</MenuItem>
                        <MenuItem href="/about">О нас</MenuItem>
                        <MenuItem href="/contacts">Связаться с нами</MenuItem>
                        <MenuItem href="/agreement">Пользовательское соглашение</MenuItem>
                    </Group>
                </nav>
            </Group>
        </Footer>
    )
}
