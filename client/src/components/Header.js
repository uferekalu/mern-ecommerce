import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchBox from './SearchBox'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  signin: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '1rem'
  },
  lushakHome: {
    color: 'white',
    textDecoration: 'none'
  }
}));

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.lushakHome} to='/'>
              Lushak
            </Link>
          </Typography>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
            <div>
            {userInfo && userInfo.isAdmin && (
              <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.accountCircle}
              >
                <AccountCircle />
              </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Users</MenuItem>
                  <MenuItem onClick={handleClose}>Products</MenuItem>
                  <MenuItem onClick={handleClose}>Orders</MenuItem>
                </Menu>
                </>
              )}
              {userInfo ? (
                <>
                  <Link onClick={logoutHandler} className={classes.signin}>
                    Profile
                  </Link>
                  <Link onClick={logoutHandler} className={classes.signin}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link onClick={logoutHandler} className={classes.signin}>
                    Log In
                  </Link>
              )}
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header