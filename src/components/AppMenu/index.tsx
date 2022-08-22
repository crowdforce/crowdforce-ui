import Link from 'next/link'
import s from './AppMenu.module.css'

export const AppMenu = () => {
    return (
        <nav className={s.navLinks}>
            <Link href="/wiki" passHref>База знаний</Link>
            <Link href="/about" passHref>О нас</Link>
        </nav>
    )
}
