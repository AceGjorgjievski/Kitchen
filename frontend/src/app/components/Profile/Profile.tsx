import {Box, Button, Modal, Typography} from "@mui/material";
import * as React from "react";
import useStyles from "../../styles/styles";
import {useState} from "react";

interface ProfileProps {
    open: any;
    logout: () => void;
    openProfileModal: () => void;
    setOpenProfileModal: (value: boolean) => void;
}


const Profile = ({user, logout, openProfileModal, setOpenProfileModal}: ProfileProps) => {

    const classes = useStyles();

    const handleCloseProfileModal = () => {
        setOpenProfileModal(false);
    }

    const handleLogout = () => {
        logout();
        handleCloseProfileModal();
    }

    return (
        <>
            <Modal
                open={openProfileModal}
                onClose={handleCloseProfileModal}
                aria-labelledby="profile-modal-title"
                aria-describedby="profile-modal-description"
            >
                <Box className={classes.boxModalStyle}>
                    <Typography id="profile-modal-title" variant="h6" component="h2">
                        User Profile
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        <strong>Name:</strong> {user?.name || 'N/A'}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
                        Logout
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Profile;
