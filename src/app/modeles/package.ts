export interface _Package {
    id: number, 
    name:string, 
    price: number, 
    description: string, 
    duration: number, 
    color: string,
    follow_up?: number; //If order is extensible or not
    items: PackageItem[];
}

export interface PackageItem {
    id: number;
    quantity: number;
    selected: boolean;
}