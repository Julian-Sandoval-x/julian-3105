export type User = {
    name: string;
    email: string;
    passwordHash: string;
}

export type Session = {
    user: Omit<User, 'passwordHash'>;
    balance: number;
}