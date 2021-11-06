import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tabbar = (props) => {
  const { containt } = props;
  const classes = useStyles();
  const [nowTab, setNowTab] = React.useState(0);

  const handleChange = (event, clickedTab) => {
    setNowTab(clickedTab);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={nowTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={nowTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={nowTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={nowTab} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Tabbar;