import classes from './Page.module.css';
import Header from '../Header';
import Footer from '../Footer';
import LoginForm from '../LoginForm';

const Page = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main className={classes.main}>
        {children}
      </main>
      <Footer />
      <LoginForm />
    </>
  );
};

export default Page;
