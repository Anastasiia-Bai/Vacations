import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddVacation from "../AddVacation/AddVacation";
import Home from "../Home/Home";
import Login from "../Login/Login";
import NavBar from "../Nav-bar/NavBar";
import Register from "../Register/Register";
import UpdateVacation from "../UpdateVacation/UpdateVacation";
import VacationsContainer from "../VacationsContainer/VacationsContainer";

export default function Layout() {
    document.title = "Vacations";

    return (
        <BrowserRouter>
            <section className="layout">
                <main>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>

                        <Route path="/updateVacation">
                            <NavBar />
                            <UpdateVacation />
                        </Route>

                        <Route path="/addVacation">
                            <NavBar />
                            <AddVacation />
                        </Route>

                        <Route path="/customer">
                            <NavBar />
                            <VacationsContainer />
                        </Route>

                        <Route path="/admin">
                            <NavBar />
                            <VacationsContainer />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>

                        <Redirect from="/" to="/home" exact />
                    </Switch>
                </main>
            </section>
        </BrowserRouter>
    )
}