import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IVacation } from '../../interfaces/IVacations/IVacation';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import Vacation from '../Vacation/Vacation';

export default function VacationsContainer() {
  const dispatch = useDispatch();
  let vacationsArray = useSelector((state: AppState) => state.vacations);

  useEffect(() => {
    axios.get<IVacation[]>("http://localhost:3001/vacations").then((response) => {
      let responsedVacationsArray = response.data;
      dispatch({ type: ActionType.ShowAllVacations, payload: responsedVacationsArray });
    }).catch((e) => {
      console.error(e);
      alert("Faild to upload vacations");
    });
  }, [dispatch]);

  return (
    <div className="vacationsContainer">
      {vacationsArray.map((vacation: IVacation, index: number) => (
        <Vacation
          key={index}
          id={vacation.id}
          image={vacation.image}
          destination={vacation.destination}
          description={vacation.description}
          startDate={vacation.startDate}
          endDate={vacation.endDate}
          price={vacation.price}
          isFollowed={vacation.isFollowed}
          amountOfFollowers={vacation.amountOfFollowers}
        />)
      )
      }
    </div>
  )
}