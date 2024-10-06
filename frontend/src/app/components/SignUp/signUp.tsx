import React, { useState } from "react";

// Material UI Imports
import {
    TextField,
    FormControl,
    InputLabel,
    Button,
    Input,
    Alert,
    Stack,
} from "@mui/material";

// Material UI Icon Imports
import LoginIcon from "@mui/icons-material/Login";
import {useAuth} from "../../../context/auth.context";

// Validations

// Email Validation
const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    //Inputs
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordRepeatInput, setPasswordRepeatInput] = useState<string>("");

    // Inputs Errors
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState(false);

    // Overall Form Validity
    const [formValid, setFormValid] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    // Handles Display and Hide Password
    const handleClickShowPassword = () => {
        const input = document.getElementById('standard-adornment-password');
        const cursorPosition = input.selectionStart; // Get the current cursor position

        setShowPassword((show) => !show); // Toggle password visibility

        setTimeout(() => {
            // Restore the cursor position after the input type change
            input.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
    }

    const handleClickShowRepeatPassword = () => {
        const input = document.getElementById('standard-adornment-password-repeat');
        const cursorPosition = input.selectionStart; // Get the current cursor position

        setShowRepeatPassword((show) => !show); // Toggle password visibility

        setTimeout(() => {
            // Restore the cursor position after the input type change
            input.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownPasswordRepeat = (event) => {
        event.preventDefault();
    };

    // Label for Checkbox
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    // Validation for onBlur Username
    const handleUsername = () => {
        if (!usernameInput) {
            setUsernameError(true);
            return;
        }

        setUsernameError(false);
    };

    // Validation for onBlur Email
    const handleEmail = () => {
        console.log(isEmail(emailInput));
        if (!isEmail(emailInput)) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
    };

    // Validation for onBlur Password
    const handlePassword = () => {
        if (
            !passwordInput ||
            passwordInput.length < 5 ||
            passwordInput.length > 20
        ) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    };

    // Validation for onBlur Password Repeat
    const handlePasswordRepeat = () => {
        if (passwordRepeatInput !== passwordInput) {
            setPasswordRepeatError(true);
            return;
        }

        setPasswordRepeatError(false);
    };

    const {register} = useAuth();

    //handle Submittion
    const handleSubmit = async () => {
        setSuccess(null);
        //First of all Check for Errors

        // IF username error is true
        if (usernameError || !usernameInput) {
            setFormValid(
                "Username is set btw 5 - 15 characters long. Please Re-Enter"
            );
            return;
        }

        // If Email error is true
        if (emailError || !emailInput) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }

        // If Password error is true
        if (passwordError || !passwordInput) {
            setFormValid(
                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }

        if (passwordRepeatError || !passwordRepeatInput) {
            setFormValid("Passwords do not match. Please Re-Enter");
            return;
        }

        setFormValid(null);

        // Proceed to use the information passed


        //Show Successfull Submittion
        try {
            console.log("Username : " + usernameInput);
            console.log("Email : " + emailInput);
            console.log("Password : " + passwordInput);
            await register(usernameInput, emailInput, passwordInput);
            setSuccess("Form Submitted Successfully");
        } catch (err) {
            console.log("SignUp error: ", err);
        }
    };

    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <TextField
                    error={usernameError}
                    label="Username"
                    id="standard-basic"
                    variant="standard"
                    sx={{ width: "100%" }}
                    size="small"
                    value={usernameInput}
                    InputProps={{}}
                    onChange={(event) => {
                        setUsernameInput(event.target.value);
                    }}
                    onBlur={handleUsername}
                />
            </div>

            <div style={{ marginTop: "5px" }}>
                <TextField
                    label="Email Address"
                    fullWidth
                    error={emailError}
                    id="standard-basic"
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={emailInput}
                    InputProps={{}}
                    size="small"
                    onBlur={handleEmail}
                    onChange={(event) => {
                        setEmailInput(event.target.value);
                    }}
                />
            </div>
            <div style={{ marginTop: "5px" }}>
                <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel
                        error={passwordError}
                        htmlFor="standard-adornment-password"
                    >
                        Password
                    </InputLabel>
                    <Input
                        error={passwordError}
                        onBlur={handlePassword}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {
                            setPasswordInput(event.target.value);
                        }}
                        value={passwordInput}
                    />
                </FormControl>
            </div>

            <div style={{ marginTop: "5px" }}>
                <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel
                        error={passwordRepeatError}
                        htmlFor="standard-adornment-password-repeat"
                    >
                        Confirm Password
                    </InputLabel>
                    <Input
                        error={passwordRepeatError}
                        onBlur={handlePasswordRepeat}
                        id="standard-adornment-password-repeat"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {
                            setPasswordRepeatInput(event.target.value);
                        }}
                        value={passwordRepeatInput}
                    />
                </FormControl>
            </div>

            <div style={{ marginTop: "10px" }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<LoginIcon />}
                    onClick={handleSubmit}
                >
                    SIGN UP
                </Button>
            </div>

            {/* Show Form Error if any */}
            {formValid && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                    <Alert severity="error" size="small">
                        {formValid}
                    </Alert>
                </Stack>
            )}

            {/* Show Success if no issues */}
            {success && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                    <Alert severity="success" size="small">
                        {success}
                    </Alert>
                </Stack>
            )}

            {/*<div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">*/}
            {/*    <a>Forgot Password</a>*/}
            {/*    <br />*/}
            {/*    Do you have an account ?{" "}*/}
            {/*    <small style={{ textDecoration: "underline", color: "blue" }}>*/}
            {/*        Sign Up*/}
            {/*    </small>*/}
            {/*</div>*/}
        </div>
    );
}