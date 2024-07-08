export interface ContactMessage {
    subject: string;
    body: string;
    date: string | null;
    author:{
        name: string;
        phoneNumber: string;
        email: string
    }
}