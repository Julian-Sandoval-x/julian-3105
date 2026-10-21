export type User = {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
}

export type PaymentStatus = {
    status: 'success' | 'transaction_failed' | 'network_error' | 'insufficient_funds';
}

export type PaymentResponse = {
    id: number;
    title: string;
    status: PaymentStatus['status'];
    status_detail: string;
    transaction_amount: number;
    date_created: string;
    authorization_code: string;
    reference: string;
    payer_id: string;
    payer_email: string;
    http_status_code: number;
}