export type User = {
    name: string;
    email: string;
    passwordHash: string;
}

export type Session = {
    user: Omit<User, 'passwordHash'>;
    saldo: number;
}

export type Payment = {
    name: string;
    card: string;
    expiration: string;
    cvv: string;
    amount: string | number;
}

export type PaymentFormData = {
    name: string;
    card: string;
    expiration: string;
    cvv: string;
    amount: string;
}