export type User = {
    name: string;
    email: string;
    passwordHash: string;
}

export type Session = {
    user: Omit<User, 'passwordHash'>;
    saldo: number;
}

export type PasswordFields = {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

export type Payment = {
    name: string;
    card: string;
    expiration: string;
    cvv: string;
    amount: string | number;
    email: string;
    idUser: string;
}

export type PaymentFormData = {
    name: string;
    card: string;
    expiration: string;
    cvv: string;
    amount: string;
}

export type PaymentView = {
    view: 'form' | 'loading' | 'success' | 'error_tx' | 'error_system';
    title: string;
    message: string;
}

export type Snail = {
    id: number;
    name: string;
    victoryPoints: number;
}

export type Bet = {
    name: string;
    Points: number;
}