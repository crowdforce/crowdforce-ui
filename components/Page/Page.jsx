import classes from './Page.module.css'

const Page = ({ children }) => {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
}

export default Page
