import s from './AppMenu.module.css'

export const AppMenu = () => {
    return (
    <nav className={s.navLinks}>
        <a href="/wiki">База знаний</a>
        <a href="/about">О нас</a>
    </nav>
    )
}
