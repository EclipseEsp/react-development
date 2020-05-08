import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatDemo from './ChatDemo'

import { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [input,setInput] = React.useState('');
  const [status,setConnection] = React.useState(false);
  const [response, setResponse] = React.useState("");
  var io = null;
  var socket = null;
  // Establish initiate connection with Server
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect( () =>{
    io = require('socket.io-client').connect('http://localhost:8000');
    //socket = io.connect('http://localhost:8000');
    setConnection(true);
    io.on('news', (data) => {
      console.log(data);
      io.emit('my other event', { my: 'data' });
    });
    io.on('error', function (err) {
      console.log(err);
  });
  },[]);

  const connectionStatus = () => {
    console.log(status);
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    //send input to server here
    io = require('socket.io-client');
    
    //connects to server
    socket = io.connect('http://localhost:8000');
    setConnection(true);
    // add a listener for onreceived 'news' , do this function(data) { console.log(data); socket emit....;}
    socket.on('news', (data) => {
      console.log(data);
      // 'my other event' is a namespace, need to correlate to namespace on server.js
      socket.emit('from client', { message: input });
    });
    socket.on('error', function (err) {
      console.log(err);
  });
    
    setInput('');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
            <h1 style={{textAlign: "center"}}>Projects</h1>
        <Divider />
            <h1 style={{textAlign: "center"}}>Socket</h1>
        <Divider />
            <h1 style={{textAlign: "center"}}>HTTP</h1>
        <Divider />
            <h1 style={{textAlign: "center"}}>Fetch</h1>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={11}>
              <Paper className={fixedHeightPaper}>
                  <h1>Socket Demo</h1>
                  <p> abcdefnioasjdiasjmfmaskldmklsamdklasmlkd</p>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={8} lg={11}>
              <Paper className={fixedHeightPaper}>
                  <h1>Client 1</h1>
                  <div className="Client1">
                  <button className="Client1Status" onClick={connectionStatus}> Connect </button>
                  <form className="Client1Form">
                    <label>
                      <input id="input" value={input} onChange={handleChange} type="text" name="name" placeholder="Type Message..."/>
                    </label>
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                  </form>
                  </div>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
      <ChatDemo />
    </div>
  );
}