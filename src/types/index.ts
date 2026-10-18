export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string;
}

export type Snail = {
    id: number;
    name: string;
}

export type StatusPayment = 'pending' | 'completed' | 'failed';

export type SnailPay = {
    id: number;
    status: StatusPayment;
    status_detail: string;
    transaction_amount: number;
    date_created: Date;
    authorization_code: string;
    reference: string;
    payer_id: number;
    payer_email: string;
}