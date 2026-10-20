export type PaymentStatus = {
    status: 'success' | 'transaction_failed' | 'network_error' | 'insufficient_funds';
}

export type PaymentResponse = {
    id: number;
    status: PaymentStatus['status'];
    status_detail: string;
    transaction_amount: number;
    date_created: string;
    authorization_code: string;
    reference: string;
    payer_id: string;
    payer_email: string;
}