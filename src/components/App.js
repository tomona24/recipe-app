import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import TopPage from './pages/TopPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#06B3B7',
    },
    secondary: {
      main: '#F73420',
      light: '#6BF2F2',
    },
  },
});

const App = (props) => {
  const { uid, authenticated, authenticating } = props;
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  if (authenticating && !authenticated) {
    return <>Loading</>;
  }
  return (
    <ThemeProvider theme={theme}>
      <TopPage
        t={t}
        setLang={setLang}
        lang={lang}
        uid={uid}
        authenticated={authenticated}
        authenticating={authenticating}
      />
    </ThemeProvider>
  );
};

const mapStateToProps = ({
  firebase: {
    auth,
    auth: { uid },
  },
}) => {
  return {
    uid,
    authenticating: !isLoaded(auth),
    authenticated: !isEmpty(auth),
  };
};

export default connect(mapStateToProps)(App);
