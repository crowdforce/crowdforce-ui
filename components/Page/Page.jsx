import classes from './Page.module.css';
import Footer from '../Footer';

const Page = (props) => {
  const { children } = props;

  return (
    <>
      <main className={classes.main}>
        {children}
      </main>
    </>
  );
};

export default Page;
