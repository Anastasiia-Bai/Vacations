import { makeStyles, Container, Typography, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useState } from "react";
import { IUser } from "../../interfaces/IUser/IUser";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import './register.css';

const schema = yup.object().shape({
    email: yup.string().required().email(),
    userName: yup.string().required().min(2).max(25),
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

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
        resolver: yupResolver(schema),
    });

    const { heading, submitButton } = useStyles();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const history = useHistory();

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onSubmit = async () => {
        try{
            const response = await axios.post("http://localhost:3001/users/", {userName, email, password});
            let userData = response.data;
            console.log(userData);
            history.push("/login");
        }
        catch(e){
            console.log(e);
            alert("failed to registration")
        }
    };

    return (
        <Container className="register" maxWidth="xs">
            <br/>
            <Typography className={heading} variant="h3">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    {...register ("email")}
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
                    {...register ("userName")}
                    onChange={onUserNameChanged}
                    variant="outlined"
                    margin="normal"
                    label="User Name"
                    helperText={errors.userName?.message}
                    error={!!errors.userName?.message}
                    fullWidth
                    required
                />
                <TextField
                    {...register ("password")}
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
                    Sign Up
                </Button>
                <p>Already a member? <NavLink className="navbarLink" to="/login"><span>Login</span></NavLink></p>
                <br/>
            </form>
        </Container>
    );
}

export default Register;