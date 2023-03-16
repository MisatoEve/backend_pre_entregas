import { faker } from "@faker-js/faker";

faker.locale = "es";

export const generateProducts = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(6),
    price: faker.commerce.price(),
    status: true,
    stock: faker.random.numeric(1),
    category: faker.commerce.department(),
    thumbnails: [faker.image.imageUrl()],
  };
};