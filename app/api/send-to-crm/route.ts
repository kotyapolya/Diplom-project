import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const cartToken = cookies['cartToken'];

    if (!cartToken) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
    }

    const userCart = await prisma.cart.findFirst({
      include: {
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
      where: {
        token: cartToken,
      },
    });

    if (!userCart || userCart.items.length === 0) {
      return NextResponse.json({ error: 'Cart not found or empty' }, { status: 400 });
    }

    

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
  source_uuid: uuidv4(),
  buyer_comment: data.comment || '',
  manager_id: 1,
  manager_comment: order?.status,
  promocode: data.promocode || '',
  discount_percent: 0,
  discount_amount: 0,
  shipping_price: 0,
  wrap_price: 0,
  gift_message: '',
  is_gift: false,
  gift_wrap: false,
  taxes: 0,
  ordered_at: formatDate(new Date()),
  buyer: {
    full_name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
  },
 shipping: {
  delivery_service_id: 1,
  tracking_code: '',
  shipping_service: 'Нова Пошта',
  shipping_address_city: data.address || '',
  shipping_address_country: 'Ukraine',
  shipping_address_region: '', // можеш додати поле в форму, якщо потрібно
  shipping_address_zip: '',    // теж саме
  shipping_secondary_line: data.address || '',
  shipping_receive_point: '',
  recipient_full_name: `${data.firstName} ${data.lastName}`,
  recipient_phone: data.phone,
  warehouse_ref: '',
  shipping_date: new Date().toISOString().split('T')[0],
},

  marketing: {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  },
 products: userCart.items.flatMap((item) => {
  const mainProduct = {
    sku: item.productItem.SKU,
    price: item.productItem.price,
    purchased_price: item.productItem.price,
    discount_percent: 0,
    discount_amount: 0,
    quantity: item.quantity,
    unit_type: 'шт',
    name: item.productItem.product.name,
    comment: '',
    picture: item.productItem.product.imageUrl || '',
    properties: [],
  };

  const ingredientsAsProducts = item.ingredients.map((ing) => ({
    sku: ing.SKU || '', // 👈 если есть SKU — передаём
    price: ing.price,
    purchased_price: ing.price,
    discount_percent: 0,
    discount_amount: 0,
    quantity: 1,
    unit_type: 'шт',
    name: ing.name,
    comment: 'Додатковий інгредієнт',
    picture: '',
    properties: [],
  }));

  return [mainProduct, ...ingredientsAsProducts];
}),



  payments: [
    {
      payment_method_id: 1,
      payment_method: 'Online',
      amount: userCart.totalAmount,
      description: 'Оплата замовлення',
      payment_date: formatDate(new Date()),
      status: 'not_paid',
    },
  ],
  custom_fields: [],
};

try {
  const crmResponse = await fetch('https://openapi.keycrm.app/v1/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CRM_API_TOKEN}`,
    },
    body: JSON.stringify(crmPayload),
  });

  const crmResult = await crmResponse.json();

  if (!crmResponse.ok) {
    console.error('[SendToCRM] CRM responded with error:', crmResult);
    return NextResponse.json({ error: 'CRM request failed', details: crmResult }, { status: 502 });
  }

  console.log('[SendToCRM] Success:', crmResult);
} catch (err) {
  console.error('[SendToCRM] Fetch error:', err);
  return NextResponse.json({ error: 'Failed to send order to CRM' }, { status: 502 });
}


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[SendToCRM] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
