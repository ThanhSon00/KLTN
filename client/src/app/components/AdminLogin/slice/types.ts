/* --- STATE --- */
export interface Admin {
    id: string;
    name: string;
    avatar: string;
}

export interface AdminState {
    admin?: Admin;
}
