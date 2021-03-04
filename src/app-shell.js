import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  toolBar: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const AppShell = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const authContext =  useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    // eslint-disable-next-line no-unused-vars
  const authenticatedLinks = (
    <>
    <ListItem button key={'alcaldes-auxiliares'} component={Link} to="/alcaldes-auxiliares">
      <ListItemText>Alcaldes Auxiliares</ListItemText>
    </ListItem>
    </>
  );

    // eslint-disable-next-line no-unused-vars
  const staffLinks = (
    <>
    <ListItem button key={'agregar-comunidad'} component={Link} to="/agregar-comunidad">
      {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
      <ListItemText primary={'Agregar Comunidad'} />
    </ListItem>

    <ListItem button key={'agregar-alcalde-auxiliar'} component={Link} to="/agregar-alcalde-auxiliar">
      <ListItemText primary={'Agregar Alcalde Auxiliar'} />
    </ListItem>
    </>
  );

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key={'Comunidades'} component={Link} to="/">
          {/* <ListItemIcon><MapIcon /></ListItemIcon> */}
          <ListItemText primary={'Comunidades'} />
        </ListItem>

        <ListItem button key={'puntos-de-interes'} component={Link} to="/puntos-de-interes">
          <ListItemText primary={'Puntos de Interes'} />
        </ListItem>

        {/* {authContext.isAuthenticated() && authenticatedLinks}
        {authContext.isStaff() && staffLinks} */}
      </List>
      <Divider />
    </div>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar className={classes.toolBar}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"     
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Antigua Guatemala
          </Typography>
          </div>
          { authContext.isAuthenticated() 
            ? (<Button color="inherit" onClick={authContext.logout}>Logout</Button>)
            : (<Button color="inherit" component={Link} to="/login">Login</Button>)
          }
        </Toolbar>
      </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

export default AppShell;