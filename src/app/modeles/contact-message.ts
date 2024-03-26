export interface contactMessage {
    subject: string;
    body: string;
    author:{
        name: string;
        phoneNumber: string;
        email: string
    }
}