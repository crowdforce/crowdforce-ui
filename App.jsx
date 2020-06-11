/* eslint-disable react/jsx-props-no-spreading */
import ThemeProvider from './components/ThemeProvider';

const App = ({ Component, pageProps }) => (
  <>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
