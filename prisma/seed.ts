import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  price,
  SKU,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  price?: number;
  SKU: String;
}) => {
  return {
    productId,
    price: randomDecimalNumber(80, 180),
    pizzaType,
    size,
    SKU
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        phone: '+38 111-111-11-11',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
        phone: '+38 111-111-11-11',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      SKU: '302',
      name: 'Пепероні класична',
      imageUrl:
        'https://i.postimg.cc/dQWwf61z/4.webp',
      categoryId: 1,
       ingredients: {
        connect: _ingredients.slice(0, 5),
      },
      //price: 150,
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      SKU: '301',
      name: 'Сирна (чотири сира)',
      imageUrl:
        'https://i.postimg.cc/xjg12Ysp/2.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
     // price: 175,
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      SKU: '300',
      name: 'Гостра пепероні',
      imageUrl:
        'https://i.postimg.cc/T122DHPc/1.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
      //price: 165,
    },
  });

 

await prisma.productItem.createMany({
    data: [
  generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20, SKU: pizza1.SKU  }),
  generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30, SKU: pizza1.SKU }),
  generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40, SKU: pizza1.SKU }),

  generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20,SKU: pizza2.SKU  }),
  generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30, SKU: pizza2.SKU }),
  generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40, SKU: pizza2.SKU }),
  generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20,SKU: pizza2.SKU  }),
  generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30,SKU: pizza2.SKU  }),
  generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40,SKU: pizza2.SKU  }),

  generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20,SKU: pizza3.SKU  }),
  generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30,SKU: pizza3.SKU  }),
  generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40,SKU: pizza3.SKU  }),

       // Остальные продукты
      generateProductItem({ productId: 1,SKU: products[0].SKU }),
      generateProductItem({ productId: 2, SKU: products[1].SKU }),
      generateProductItem({ productId: 3, SKU: products[2].SKU }),
      generateProductItem({ productId: 4, SKU: products[3].SKU }),
      generateProductItem({ productId: 5, SKU: products[4].SKU }),
      generateProductItem({ productId: 6, SKU: products[5].SKU }),
      generateProductItem({ productId: 7, SKU: products[6].SKU }),
      generateProductItem({ productId: 8, SKU: products[7].SKU }),
      generateProductItem({ productId: 9, SKU: products[8].SKU }),
      generateProductItem({ productId: 10, SKU: products[9].SKU }),
      generateProductItem({ productId: 11, SKU: products[10].SKU }),
      generateProductItem({ productId: 12, SKU: products[11].SKU }),
      generateProductItem({ productId: 13, SKU: products[12].SKU }),
      generateProductItem({ productId: 14, SKU: products[13].SKU }),
      generateProductItem({ productId: 15, SKU: products[14].SKU }),
      generateProductItem({ productId: 16, SKU: products[15].SKU }),
      generateProductItem({ productId: 17, SKU: products[15].SKU }),

         ],
  });
  // Тут раніше були об'єкти з undefined — їх треба прибрати

/*
// Прибираємо ті, в яких price, pizzaType або size відсутні:
const filteredItems = productItems.filter(
  (item) => item.price !== undefined && item.pizzaType !== undefined && item.size !== undefined
);

await prisma.productItem.createMany({
  data: filteredItems,
});

*/
 

// Потім



  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://i.postimg.cc/TPGM2cBt/1.jpg',
      },
      {
        previewImageUrl:
          'https://i.postimg.cc/gjtBvVSb/2-1.jpg',
      },
      {
        previewImageUrl:
          'https://i.postimg.cc/4dNDVxft/3.jpg',
      },
      {
        previewImageUrl:
          'https://i.postimg.cc/j2DB33JS/4.jpg',
      },
      {
        previewImageUrl:
          'https://i.postimg.cc/Qxx31SMw/5.jpg',
      },
      {
        previewImageUrl:
          'https://i.postimg.cc/7PRFJ4pG/6.jpg',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/3N2Fw2sZ/1.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/63cGbYxg/2.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/MHGfCVWT/3.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/bY6tQCT2/4.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/R0Q3qXhh/5.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.postimg.cc/FRrYS3kZ/6.jpg',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
