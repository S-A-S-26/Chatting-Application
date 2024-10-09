export interface TLogin {
    phone: string;
    password: string;
}

export interface TUser extends TLogin {
    username: string;

}

export interface TProfile {
    _id: string,
    username: string,
    phone: string,
    status: string,
    profile: string,
    pinned: [],
    lastSeen: string,
}

export interface TUpdateProfile {
    _id: string,
    username?: string,
    status?: string,

}

export interface TChatData {
    messages: []
}
