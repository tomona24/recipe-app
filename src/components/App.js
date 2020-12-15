import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { CssBaseline } from '@material-ui/core';
import TopPage from './pages/TopPage';
import Header from './organisms/Header';
import LogIn from './molecules/LogIn';

const App = (props) => {
  const { uid, authenticated, authenticating } = props;
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <TopPage
        t={t}
        setLang={setLang}
        lang={lang}
        uid={uid}
        authenticated={authenticated}
        authenticating={authenticating}
      />
    </>
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
