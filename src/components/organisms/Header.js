import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddToPhotos, Home, Error } from '@material-ui/icons';
// MenuBook,

const useStyles = makeStyles(() => ({
  button: {
    margin: '8px',
    padding: '4px, 8px',
  },
  root: {
    width: 500,
    color: '#000',
  },
}));

const Header = (props) => {
  const { t, setLang, lang } = props;
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
      >
        {t('言語を切り替え')}
      </Button>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <Link to="/create">
          <BottomNavigationAction
            label="Recents"
            icon={<AddToPhotos color="primary" />}
          />
        </Link>
        <Link to="/">
          <BottomNavigationAction label="トップページ" icon={<Home />} />
        </Link>
        <Link to="/404">
          <BottomNavigationAction label="404" icon={<Error />} />
        </Link>
      </BottomNavigation>
    </div>
  );
};

export default Header;
