export interface IVacation {
    id: number;
    destination: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    price: number;
    isFollowed?: boolean;
    amountOfFollowers: number;
}