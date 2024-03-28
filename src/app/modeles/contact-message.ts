export interface ContactMessage {
    subject: string;
    body: string;
    author:{
        name: string;
        phoneNumber: string;
        email: string
    }
}