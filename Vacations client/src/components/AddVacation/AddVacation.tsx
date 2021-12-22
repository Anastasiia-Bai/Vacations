import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import './addVacation.css';

export default function AddVacation() {
    const [destination, setVacationDestination] = useState("");
    const [description, setVacationDescription] = useState("");
    const [image, setVacationImage] = useState("");
    const [startDate, setVacationStartDate] = useState("");
    const [endDate, setVacationEndDate] = useState("");
    const [price, setVacationPrice] = useState("");

    const history = useHistory();

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
        setVacationPrice(event.target.value);
    }

    const onAddVacationClicked = async () => {
        try {
            const response = await axios.post("http://localhost:3001/vacations/", {destination, description, image, startDate, endDate, price});
            let vacationData = response.data;
            console.log(vacationData);
            alert("The vacation was added successful!");
            history.push('/admin');
        } catch(e) {
            alert(e);
        }
    }

    const onBackClicked = async () => {
        history.push('/admin');
    }

    return (
        <div className="addVacation-div">
            <br/>
            <h1>Add Vacation</h1>
            <input className="addVacation-inputs" type="text" placeholder="Destination" onChange={onDestinationChanged}></input>
            <br/> <br/>
            <input className="addVacation-inputs" type="text" placeholder="Description" onChange={onDescriptionChanged}></input>
            <br/> <br/>
            <input className="addVacation-inputs" type="text" placeholder="Image" onChange={onImageChanged}></input>
            <br/> <br/>
            <input className="addVacation-inputs" type="date" placeholder="Start date" onChange={onStartDateChanged}></input>
            <br/> <br/>
            <input className="addVacation-inputs" type="date" placeholder="End date" onChange={onEndDateChanged}></input>
            <br/> <br/>
            <input className="addVacation-inputs" type="text" placeholder="Price" onChange={onPriceChanged}></input>
            <br/> <br/>
            <button className="addVacation-btn" onClick={onAddVacationClicked}>Add vacation</button>
            <button className="back-btn" onClick={onBackClicked}>Back</button>
            <br/> <br/>
        </div>
    )
}