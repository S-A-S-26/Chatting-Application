export interface TLogin{
    phone: string;
    password: string;
}

export interface TUser extends TLogin{
    username: string;
    
}

