import classes from './Page.module.css';
import Header from '../Header';
import Footer from '../Footer';

const Page = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main className={classes.main}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Page;
