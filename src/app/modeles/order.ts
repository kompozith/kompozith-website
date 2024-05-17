export interface Order {
    author:{
        lastname: string;
        firstname: string;
        email: string;
        phoneNumber: string;
    }
    requirements: string;
    items: OrderItem[];
    date: string | null;
}

export interface OrderItem {
    id: string;
    quantity: number;
}