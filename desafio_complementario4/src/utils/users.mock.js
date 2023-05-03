import { faker } from "@faker-js/faker";

faker.locale = "es";

export const newFakerUser = () => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.numeric(1),
    password: faker.random.alphaNumeric(6),
  };
};