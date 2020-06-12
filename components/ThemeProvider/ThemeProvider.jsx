import {
  ThemeProvider as MuiThemeProvider, createGenerateClassName, StylesProvider, createMuiTheme,
} from '@material-ui/core/styles';
import React from 'react';
import primary from '@material-ui/core/colors/amber';
import secondary from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    action: {
      selected: 'rgba(168,119,255,0.08)',
    },
  },
});

const generateClassName = createGenerateClassName({
  seed: 'rc',
});

const ThemeProvider = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </StylesProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
