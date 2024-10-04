"use client";

import {Box, Chip, CircularProgress, Paper, Switch} from "@mui/material";
import {useEffect, useState} from "react";
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Face';

import SignUp from '../components/SignUp/signUp'
import LogIn from "../components/Login/login";
import {useAuth} from "../../context/auth.context";
import {useRouter} from "next/navigation";

const Login = () => {
    const [checked, setChecked] = useState(true);
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading) {
            if(user) {
                router.push("/")
            }
        }


    }, [user, isLoading])

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <>
            <Box sx={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
                <Paper elevation={3} style={{padding: "10px", paddingBottom: "50px", width: '400px'}}>
                    <div align="center">
                        {checked ? (
                            <Chip
                                icon={<LockIcon/>}
                                label="Log In"
                                variant="outlined"
                                color="info"
                            />
                        ) : (
                            <Chip
                                icon={<FaceIcon/>}
                                label="Sign Up"
                                variant="outlined"
                                color="info"
                            />
                        )}
                        <br/>

                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{"aria-label": "controlled"}}
                        />
                    </div>

                    {checked ? <LogIn/> : <SignUp/>}
                </Paper>
            </Box>

        </>
    );
};

export default Login;


