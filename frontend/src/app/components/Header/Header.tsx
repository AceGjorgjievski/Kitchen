import Link from "next/link";
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import {SoupKitchenOutlined} from "@mui/icons-material";
import useStyles from "../../styles/styles";

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline/>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <SoupKitchenOutlined
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </SoupKitchenOutlined>
                        <Typography variant="h6" component="div">
                            Kitchen
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                            <Button color="inherit" component={Link} href="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} href="/categories">
                                Main Menu
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        <Button color="inherit" component={Link} href="/login">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;


