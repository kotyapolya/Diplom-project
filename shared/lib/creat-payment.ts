// lib/create-payment.ts
import axios from 'axios';

interface MonobankInvoiceRequest {
  amount: number;
  redirectUrl: string;
  webHookUrl: string;
  code: string;
  walletId: string;
  agentFeePercent: number;
}

interface MonobankInvoiceResponse {
  invoiceId: string;
  pageUrl: string;
}

export async function createMonobankInvoice(orderId: number, amount: number): Promise<MonobankInvoiceResponse> {
  const response = await axios.post<MonobankInvoiceResponse>(
    'https://api.monobank.ua/api/merchant/invoice/create',
   {
   amount: Math.round(amount * 100), 
  redirectUrl: `${process.env.MONOBANK_REDIRECT_URL}?orderId=${orderId}`,
  webHookUrl: process.env.MONOBANK_WEBHOOK_URL,
  merchantPaymInfo: {
    reference: String(orderId),
    destination: `Оплата замовлення №${orderId}`,
  },
},

    {
      headers: {
        'X-Token': process.env.MONOBANK_TOKEN!,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}
