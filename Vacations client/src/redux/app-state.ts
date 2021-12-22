import { IVacation } from "../interfaces/IVacations/IVacation";

export class AppState {
    vacations: IVacation[] = [];
    followedVacations: number[] = [];
    isLogedin: boolean = false;
    isAdmin: boolean = false;
    isCustomer: boolean = false;
    greetUserName: string = "";
    currentlyUpdatedVacations: IVacation = {
        id: 0,
        destination: "",
        description: "",
        image: "",
        startDate: "",
        endDate: "",
        price: 0,
        amountOfFollowers: 0,
    }
}