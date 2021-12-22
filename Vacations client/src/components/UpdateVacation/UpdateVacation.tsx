import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import './updateVacation.css';

export default function UpdateVacation() {
    let url = window.location.href;
    let id = +url.substring(url.lastIndexOf('/') + 1);
    const history = useHistory();

    const dispatch = useDispatch();
    dispatch({type: ActionType.GetVacationById, payload: id});

    const vacationDetails = useSelector((state: AppState) => state.currentlyUpdatedVacations);

    const [destination, setVacationDestination] = useState(vacationDetails.destination);
    const [description, setVacationDescription] = useState(vacationDetails.description);
    const [image, setVacationImage] = useState(vacationDetails.image);
    const [startDate, setVacationStartDate] = useState(vacationDetails.startDate);
    const [endDate, setVacationEndDate] = useState(vacationDetails.endDate);
    const [price, setVacationPrice] = useState(vacationDetails.price);

    const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationDestination(event.target.value);
    }
    const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationDescription(event.target.value);
    }
    const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationImage(event.target.value);
    }
    const onStartDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationStartDate(event.target.value);
    }
    const onEndDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationEndDate(event.target.value);
    }
    const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationPrice(+event.target.value);
    }

    const onUpdateClicked = async () => {
        try {
            await axios.put(`http://localhost:3001/vacations/${id}`, {destination, description, image, startDate, endDate, price});
            alert("Vacation updated successefully!");
            history.push("/admin");
        } catch(e) {
            alert(e);
        }
    }

    const onBackClicked = async () => {
        history.push("/admin");
    }

    return (
        <div className="inputs-div">
            <br/>
            <h1>Update Vacation</h1>
            <input className="update-inputs" type="text" placeholder="Destination" defaultValue={vacationDetails.destination} onChange={onDestinationChanged}></input>
            <br/> <br/>
            <input className="update-inputs" type="text" placeholder="Description" defaultValue={vacationDetails.description} onChange={onDescriptionChanged}></input>
            <br/> <br/>
            <input className="update-inputs" type="text" placeholder="Image" defaultValue={vacationDetails.image} onChange={onImageChanged}></input>
            <br/> <br/>
            <input className="update-inputs" type="date" placeholder="Start date" defaultValue={vacationDetails.startDate} onChange={onStartDateChanged}></input>
            <br/> <br/>
            <input className="update-inputs" type="date" placeholder="End date" defaultValue={vacationDetails.endDate} onChange={onEndDateChanged}></input>
            <br/> <br/>
            <input className="update-inputs" type="number" placeholder="Price" defaultValue={vacationDetails.price} onChange={onPriceChanged}></input>
            <br/> <br/>
            <button className="update-btn" onClick={onUpdateClicked}>Update</button>
            <button className="back-btn" onClick={onBackClicked}>Back</button>
            <br/> <br/>
        </div>
    )
}