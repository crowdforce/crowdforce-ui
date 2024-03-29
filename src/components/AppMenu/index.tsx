import { createStyles } from "@mantine/core"
import s from "./AppMenu.module.css"
import { MenuItem } from "./MenuItem"

const useStyles = createStyles((theme) => ({
}))

export type AppMenuProps = {
    vertical?: boolean
}

export const AppMenu: React.FC<AppMenuProps> = ({ vertical = false }) => {
    const { cx } = useStyles()
    return (
        <nav className={cx(s.navLinks, vertical && s.vertical)}>
            <MenuItem href="/map">Карта</MenuItem>
            <MenuItem href="/wiki">База знаний</MenuItem>
            <MenuItem href="/about">О нас</MenuItem>
        </nav>
    )
}
