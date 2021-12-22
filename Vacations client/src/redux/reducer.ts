import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";

export function reduce(oldAppState: AppState = new AppState(), action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.ShowAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.AddVacation:
            let vacation = action.payload;
            newAppState.vacations.push(vacation);
            console.log("This vacation " + JSON.stringify(vacation) + " was added");
            break;

        case ActionType.RemoveVacation:
            let removeVacationId = action.payload.vacationId;
            let updatedVacationsList = newAppState.vacations.filter(vacation => {
                return vacation.id !== removeVacationId;
            });
            newAppState.vacations = updatedVacationsList;
            break;

        case ActionType.UpdateVacation:
            let vacationObj = action.payload;
            let index = newAppState.vacations.map(function (x) { return x.id }).indexOf(vacationObj.id);
            newAppState.vacations.splice(index, 1, vacationObj);
            break;

        case ActionType.GetVacationById:
            let currentUpdatedVacationId = action.payload;
            let [vacationDetails] = oldAppState.vacations.filter(vacation => {
                return vacation.id === currentUpdatedVacationId;
            });
            newAppState.currentlyUpdatedVacations = vacationDetails;
            break;

        case ActionType.ChangeLoginLogout:
            newAppState.isLogedin = action.payload;
            break;

        case ActionType.IsAdmin:
            newAppState.isAdmin = action.payload;
            break;

        case ActionType.IsCustomer:
            newAppState.isCustomer = action.payload;
            break;

        case ActionType.GreetUser:
            newAppState.greetUserName = action.payload;
            break;
    }
    return newAppState;
}