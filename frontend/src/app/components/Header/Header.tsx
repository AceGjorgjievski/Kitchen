import Link from "next/link";
import * as React from 'react';
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography, Menu, MenuItem, Modal, Badge} from "@mui/material";
import {SoupKitchenOutlined} from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import useStyles from "../../styles/styles";
import {useAuth} from "../../../context/auth.context";
import {useState} from "react";
import ShoppingCartDrawer from "../Drawer/ShoppingCartDrawer";
import Profile from "../Profile/Profile";

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, shoppingCart, logout } = useAuth();
    const [openShoppingCartDrawer, setOpenShoppingCartDrawer] = useState<boolean>(false);
    const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);

    const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        handleCloseProfileModal();
    }
    const handleClickProfile = () => {
        handleClose();
        setOpenProfileModal(true);
    }

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
    }


    const handleShoppingCartClick = () => {
        setOpenShoppingCartDrawer((prevState) => !prevState)
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <CssBaseline/>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <SoupKitchenOutlined
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                        </SoupKitchenOutlined>
                        <Typography variant="h6" component="div">
                            <Button color="inherit" component={Link} href="/">
                                Kitchen
                            </Button>
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '30px'}}>
                            <Button color="inherit" component={Link} href="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} href="/categories">
                                Main Menu
                            </Button>
                        </Box>
                        <Box sx={{flexGrow: 1}}/>

                        {
                            !user &&
                                <>
                                    <Button color="inherit" href="/login" onClick={handleClose}>
                                        <PersonOffIcon/>
                                    </Button>
                                </>

                        }
                        {
                            user &&
                                <>
                                    <Button onClick={handleShoppingCartClick}>
                                        <>
                                            <Badge
                                                badgeContent={
                                                    user && shoppingCart && shoppingCart
                                                        .shoppingCartItems
                                                        .reduce((total, item) => total + item.quantity, 0)
                                                }
                                                color="error"
                                            >
                                                <ShoppingCartIcon style={{ color: "white" }} />
                                            </Badge>
                                        </>
                                    </Button>
                                    <Button color="inherit"
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClickUser}>
                                        <>
                                            <PersonIcon/>
                                        </>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                    <ShoppingCartDrawer
                                        open={openShoppingCartDrawer}
                                        toggleDrawer={setOpenShoppingCartDrawer}
                                    />
                                </>

                        }
                    </Toolbar>
                </AppBar>
            </Box>

            {
                openProfileModal &&
                <Profile
                    user={user}
                    logout={logout}
                    openProfileModal={openProfileModal}
                    setOpenProfileModal={setOpenProfileModal}
                />
            }
        </>
    );
};

export default Header;


