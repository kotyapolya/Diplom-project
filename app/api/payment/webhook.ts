// app/api/payment/webhook.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { OrderStatus } from '@prisma/client'; // ✅ Імпортуй enum

import axios from 'axios';

function mapMonobankStatusToOrderStatus(status: string): OrderStatus {
  switch (status) {
    case 'success':
      return OrderStatus.SUCCEEDED;
    case 'failure':
    case 'expired':
      return OrderStatus.CANCELLED;
    default:
      return OrderStatus.PENDING;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  console.log('Webhook received:', req.body);
  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ message: 'Missing invoiceId' });
    }

    // Запит до Monobank на перевірку статусу
    const response = await axios.get('https://api.monobank.ua/api/merchant/invoice/status', {
      headers: {
        'X-Token': process.env.MONOBANK_TOKEN!,
      },
      params: {
        invoiceId,
      },
    });

    const statusData = response.data;

  await prisma.order.updateMany({
  where: {
    paymentId: invoiceId,
  },
  data: {
    status: mapMonobankStatusToOrderStatus(statusData.status),
  },
});


    return res.status(200).json({ ok: true });


  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
