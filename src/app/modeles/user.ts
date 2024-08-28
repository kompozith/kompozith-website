export class User {
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    
    constructor(data: any) {
        this.firstName = data?.firstName;
        this.lastName = data?.lastName;
        this.email = data?.email;
        this.phoneNumber = data?.phoneNumber;
    }
}