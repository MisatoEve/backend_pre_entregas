import supertest from "supertest";
import chai from "chai";
import dotenv from "dotenv";
import { generateProducts } from "../../utils/products.mock.js";
dotenv.config();

const expect = chai.expect;
const requester = supertest(process.env.BASE_URL);

describe("Testing /api/carts endpoint", () => {
  describe("POST /api/carts should create a new cart", () => {
    it("POST should return status 200 when cart is created", async () => {
      const { status } = await requester.post("/api/carts");

      expect(status).to.exist.and.to.be.equal(200);
    });
  });

  describe("GET /api/carts/:cid should return if the cart is finded status 200, with and empty array else status 400", () => {
    let cid;

    before(async () => {
      const { _body } = await requester.post("/api/carts");

      cid = _body.payload._id;
    });

    it("GET should return status 200", async () => {
      const { status } = await requester.get(`/api/carts/${cid}`);

      expect(status).to.exist.and.to.be.equal(200);
    });

    it("GET should return an object with a carts array property", async () => {
      const { _body } = await requester.get(`/api/carts/${cid}`);

      expect(_body.payload).to.be.an("object");
      expect(_body.payload.carts).to.exist.and.to.be.an("array");
    });

    it("GET should return status 400 if cart doesnt exist", async () => {
      const { status } = await requester.get(`/api/carts/q123e`);

      expect(status).to.exist.and.to.be.equal(400);
    });
  });

  describe("POST /api/carts/:cid", () => {
    let cid;

    const arrayOfProducts = generateProducts();

    before(async () => {
      const { _body } = await requester.post("/api/carts");

      cid = _body.payload._id;
    });

    it("POST should return status 200 if the array of products was sended", async () => {
      const { status } = await requester
        .post(`/api/carts/${cid}`)
        .send([arrayOfProducts]);

      expect(status).to.exist.and.to.be.equal(200);
    });

    it("POST should return status 400 if the cart id is not defined", async () => {
      const { status } = await requester
        .post(`/api/carts/1234`)
        .send([arrayOfProducts]);

      expect(status).to.exist.and.to.be.equal(400);
    });

    it("POST must save the array of products and not be empty", async () => {
      const { _body } = await requester
        .post(`/api/carts/${cid}`)
        .send([arrayOfProducts]);

      expect(_body.payload).to.exist.and.not.be.empty;
    });
  });

  describe("DELETE /api/carts/:cid", () => {
    let cid;

    const arrayOfProducts = generateProducts();

    before(async () => {
      const { _body } = await requester.post("/api/carts");

      cid = _body.payload._id;

      await requester.post(`/api/carts/${cid}`).send([arrayOfProducts]);
    });

    it("DELETE should return status 200 if the products in the cart were deleted", async () => {
      const { status } = await requester.delete(`/api/carts/${cid}`);

      expect(status).to.exist.and.to.be.equal(200);
    });

    it("DELETE should return status 400 if the cart wasnt founded", async () => {
      const { status } = await requester.delete(`/api/carts/123456`);

      expect(status).to.exist.and.to.be.equal(400);
    });
  });

  //TODO
  describe("POST /api/carts/:cid/product/:pid", () => {});

  describe("PUT /api/carts/:cid/product/:pid", () => {});

  describe("DELETE /api/carts/:cid/product/:pid", () => {});
});