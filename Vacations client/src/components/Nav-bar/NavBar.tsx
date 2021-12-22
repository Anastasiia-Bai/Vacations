import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import './navBar.css';

export default function NavBar() {
    const dispatch = useDispatch();
    let isLogedin = useSelector((state: AppState) => state.isLogedin);
    let isAdmin = useSelector((state: AppState) => state.isAdmin);
    let greetUserName = useSelector((state: AppState) => state.greetUserName);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            let userData: any = localStorage.getItem("token");
            let parsedToken = JSON.parse(userData);
            let greetUserName = parsedToken.userName;

            if (parsedToken.userType === "ADMIN") {
                dispatch({ type: ActionType.IsAdmin, payload: true });
            } else {
                dispatch({ type: ActionType.IsAdmin, payload: false });
            }
            dispatch({ type: ActionType.ChangeLoginLogout, payload: true });
            dispatch({ type: ActionType.GreetUser, payload: greetUserName });
        }
    }, [dispatch]);

    function onLogoutClicked() {
        localStorage.setItem("token", "");
        dispatch({ type: ActionType.ChangeLoginLogout, payload: false });
    }

    return (
        <div className="navBar">
            {!isAdmin && isLogedin && <h1>Welcom {greetUserName}! Choose your follow travel!</h1>}
            {isAdmin && isLogedin && <h1>Welcom {greetUserName}!</h1>}
            <div className="links-container">
                {isAdmin && isLogedin && <button className="button" type="submit"><NavLink className="landing-links" to="/addVacation">Add Vacation</NavLink></button>}
                {isLogedin && <button className="button" type="submit"><NavLink className="landing-links" to="/home" onClick={onLogoutClicked}>Logout</NavLink></button>}
            </div>
        </div>
    )
}
