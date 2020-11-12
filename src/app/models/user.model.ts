export interface IUser {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: IUserAddress;
}

interface IUserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}
