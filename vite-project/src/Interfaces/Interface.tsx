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
    unseenCount: number,
}

export interface TUpdateProfile {
    _id: string,
    username?: string,
    status?: string,

}

export interface TChatData {
    messages: [],
    _id?: String,
}

export interface TMessage {
    _id: string,
    chat_id: string,
    message_id: string,
    receiver_id: string,
    sender: string,
    seen: boolean,
    content: string,
}
