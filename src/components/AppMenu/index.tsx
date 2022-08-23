import s from './AppMenu.module.css'
import { MenuItem } from './MenuItem'

export const AppMenu = () => {
    return (
        <nav className={s.navLinks}>
            <MenuItem href="/map">Карта</MenuItem>
            <MenuItem href="/wiki">База знаний</MenuItem>
            <MenuItem href="/about">О нас</MenuItem>
        </nav>
    )
}
