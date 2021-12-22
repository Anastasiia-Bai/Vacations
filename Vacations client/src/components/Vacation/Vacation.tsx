import { useDispatch, useSelector } from 'react-redux';
import { IVacation } from '../../interfaces/IVacations/IVacation';
import { AppState } from '../../redux/app-state';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';
import { ActionType } from '../../redux/action-type';
import axios from 'axios';
import './vacation.css';

export default function Vacation(props: IVacation) {
    const history = useHistory();
    const dispatch = useDispatch();
    let admin = useSelector((state: AppState) => state.isAdmin);
    let id = props.id;

    const onDeleteVacationClicked = async () => {
        dispatch({ type: ActionType.RemoveVacation, payload: { vacationId: props.id } });

        try {
            axios.delete(`http://localhost:3001/vacations/${id}`);
        } catch (e) {
            alert("An error occurred while deleting the vacation.")
            console.log(e);
        }
    }

    const onUpdateVacationClicked = async () => {
        history.push(`/updateVacation/${id}`);
    }

    const onFollowVacationClicked = async () => {
        try {
            if(!props.isFollowed) {
                await axios.post(`http://localhost:3001/followers/`, { id });
                await axios.get<IVacation>("http://localhost:3001/vacations").then((response) => {
                    let responsedVacationsArray = response.data;
                    dispatch({ type: ActionType.ShowAllVacations, payload: responsedVacationsArray });
                }).catch((error) => console.log("Error featching vacations", error));
            } else {
                await axios.delete(`http://localhost:3001/followers/${id}`, {});
                await axios.get<IVacation>("http://localhost:3001/vacations").then((response) => {
                    let responsedVacationsArray = response.data;
                    dispatch({ type: ActionType.ShowAllVacations, payload: responsedVacationsArray });
                }).catch((error) => console.log("Error featching vacations", error));
            }
        } catch {
            console.log("Faild to follow vacation!");
        }
    } 

    return (
        <div className="vacation">
            {admin && <div className="admin-tools">
                <span className="deleteVacation" onClick={onDeleteVacationClicked}><DeleteIcon /></span>
                <span className="updateVacation" onClick={onUpdateVacationClicked}><EditIcon /></span>
            </div>}
            <h2>{props.destination}</h2>
            <img className="vacation-img" src={props.image} alt="none"></img>
            <div className="description"><span>{props.description}</span></div>
            <p>Dates: {props.startDate} - {props.endDate}</p>
            <p>Price: {props.price} $</p>
            <p>{props.amountOfFollowers}</p>
            {!admin && <div>
                <span className="followVacation" onClick={onFollowVacationClicked}>
                    {!props.isFollowed && <FavoriteBorderIcon/>}
                    {props.isFollowed && <FavoriteIcon />}
                </span>
            </div>}
        </div>
    )
}