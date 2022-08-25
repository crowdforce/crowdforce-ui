import React from 'react'
import classes from './Page.module.css'

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
}

export default Page
