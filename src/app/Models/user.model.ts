export class User{
    id?: number;
    username: string;
    name: string;
    first_name: string;
    birthdate: Date;
    address: string;
    address_number: number;
    zip_code: number;
    city: string;
    email: string;
    password: string;
    isAdmin?: boolean;

    constructor(data: any){
        this.id = data.id;
        this.username = data.username;
        this.name = data.name;
        this.first_name = data.first_name;
        this.birthdate = data.birthdate;
        this.address = data.address;
        this.address_number = data.address_number;
        this.zip_code = data.zip_code;
        this.city = data.city;
        this.email = data.email;
        this.password = data.password;
    }
}