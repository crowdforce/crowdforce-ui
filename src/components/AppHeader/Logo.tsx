import s from './Logo.module.css'
import Link from 'next/link'

export const Logo = () => (
    <Link href={'/'} passHref>
        <a className={s.logo}>Crowd force</a>
    </Link>
)
