export interface IUser {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
    isActive: boolean;
    isAdmin: boolean;
    clerkUserId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IVehicle {
    _id : string;
    name : string;
    category : string;
    brand : string;
    model : string;
    rentPerHour : number;
    media : string[];
    isActive : boolean;
    status : string;
    createdAt : string;
    updatedAt : string;
}