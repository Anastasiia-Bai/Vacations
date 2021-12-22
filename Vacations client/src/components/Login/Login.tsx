import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as yup from "yup";
import { IUser } from '../../interfaces/IUser/IUser';
import { ActionType } from '../../redux/action-type';
import './login.css';

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(120),
});

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
        resolver: yupResolver(schema),
    });

    const { heading, submitButton } = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const onEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3001/users/login", { email, password });
            let userData = response.data;
            axios.defaults.headers.common["Authorization"] = "Bearer " + userData.token;
            localStorage.setItem("token", JSON.stringify(userData));
            dispatch({ type: ActionType.ChangeLoginLogout, payload: true });

            if (userData.userType === "ADMIN") {
                history.push('/admin');
                dispatch({ type: ActionType.IsAdmin, payload: true });
            } else if (userData.userType === "CUSTOMER") {
                history.push('/customer');
                dispatch({ type: ActionType.IsCustomer, payload: true });
            }
        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    return (
        <Container className="login" maxWidth="xs">
            <br />
            <Typography className={heading} variant="h3">
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    {...register("email")}
                    onChange={onEmailChanged}
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                    fullWidth
                    required
                />
                <TextField
                    {...register("password")}
                    onChange={onPasswordChanged}
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    helperText={errors.password?.message}
                    error={!!errors.password?.message}
                    type="password"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submitButton}
                >
                    Login
                </Button>
                <br /> <br />
                <p>Not a member yet? <NavLink className="navbarLink" to="/register"><span>Register</span></NavLink></p>
                <br />
            </form>
        </Container>
    )
}