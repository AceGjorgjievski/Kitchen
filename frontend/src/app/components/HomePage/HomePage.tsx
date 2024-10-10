"use client";

import {Button, Grid, Container, Typography} from '@mui/material';
import Image from "next/image";
import useStyles from "../../styles/styles";
import {useRouter} from "next/navigation";

const HomePage = () => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Grid container spacing={2} style={{height: '100vh'}} display={'flex'}>
                <Grid item xs={12} sm={6} md={4} className={classes.homepage}>
                    <Image
                        src="/images/logo.png"
                        alt="Placeholder"
                        width={600}
                        height={400}
                        style={{marginLeft: '130px', borderStyle: 'red'}}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} className={classes.homepage}>
                    <Container>
                        <Typography
                            variant="h1"
                            sx={{
                                color: "white",
                                fontSize: { xs: 50, sm: 70, md: 80, lg: 100 },
                                fontFamily: 'Norwester',
                                mb: { xs: -6, sm: -8, md: -10 },
                                ml: 5,
                                textAlign: "left"
                            }}
                        >
                            Welcome to our Kitchen
                        </Typography>
                        <Typography
                            sx={{
                                width: { xs: '100%', md: '75%' },
                                color: 'whitesmoke',
                                fontFamily: 'Montserrat',
                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                mt: 10,
                                textAlign: "left",
                                ml: 5
                            }}
                        >
                            Discover the best flavors, freshly prepared just for you.
                            Whether you're in the mood for a hearty meal, a sweet treat,
                            or a refreshing drink, our menu has something for everyone.
                            Check it out now!
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: 2,
                                ml: 5,
                                backgroundColor: "#FFA500",
                                fontFamily: 'Montserrat',
                                fontSize: "16px",
                            }}
                            onClick={() => {
                                router.push("/categories")
                            }}
                        >
                            Main Menu
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
