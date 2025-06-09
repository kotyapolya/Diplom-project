// app/api/send-to-crm/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const cookieStore = req.cookies;
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: { token: cartToken },
    });

    if (!userCart || userCart.totalAmount === 0) {
      return NextResponse.json({ error: 'Cart not found or empty' }, { status: 400 });
    }

    const products = userCart.items.map((item) => ({
      sku: item.productItem.SKU || item.productItem.id.toString(),
      price: item.productItem.price,
      purchased_price: item.productItem.price,
      quantity: item.quantity,
      unit_type: 'шт',
      name: item.productItem.product.name,
      comment: '', // Add a comment if needed
      picture: item.productItem.product.imageUrl || '',
      properties: [],
    }));

    const order = await prisma.order.findFirst({
  where: {
    token: userCart.token, // если связка идёт через cartId
  },
  select: {
    status: true,
  },
});

    const crmPayload = {
      source_id: 1,
      source_uuid: '115',
      buyer_comment: data.comment,
      manager_id: 1,
      manager_comment: data.comment,
      promocode: 'MERRYCHRISTMAS',
      discount_percent: 11.5,
      discount_amount: 9.99,
      shipping_price: 2.5,
      wrap_price: 3.5,
      gift_message: 'Вітаємо з ДР!',
      is_gift: true,
      gift_wrap: true,
      taxes: 2.5,
      ordered_at: new Date().toISOString(),
      buyer: {
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
      },
      shipping: {
        delivery_service_id: 1,
        tracking_code: '', // You can add tracking if available
        shipping_service: 'Нова Пошта',
        shipping_address_city: '', // Add shipping city if available
        shipping_address_country: 'Ukraine',
        shipping_address_region: '', // Add shipping region if available
        shipping_address_zip: '', // Add zip if available
        shipping_secondary_line: '', // Optional address line
        shipping_receive_point: '', // Optional point
        recipient_full_name: `${data.firstName} ${data.lastName}`,
        recipient_phone: data.phone,
        warehouse_ref: '',
        shipping_date: new Date().toISOString().split('T')[0],
      },
      marketing: {},
      products,
      payments: [],
      custom_fields: [],
    };

    await fetch('https://openapi.keycrm.app/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer NThjZWZiMzRlYjJhNDBjODcxZmFjODY1ZDljYjRlZTQxZDkwNDk2NQ',
      },
      body: JSON.stringify(crmPayload),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[CRM Error]', err);
    return NextResponse.json({ error: 'CRM send failed' }, { status: 500 });
  }
}
