const chai = require("chai");
const Catalogue = require("../src/productCatalogue");
const Product = require("../src/product");

const expect = chai.expect
let cat = null     // Catalogue object ref
let batch = null   // For later

describe("Catalogue", () => {
  beforeEach( () => {
    cat = new Catalogue("Test Catalogue");
    cat.addProduct(new Product("A123", "Product 1", 100, 10, 10.0));
    cat.addProduct(new Product("A124", "Product 2", 100, 10.0));
    cat.addProduct(new Product("A125", "Product 3", 100, 10, 10.0));
  });
  describe("findProductById", function () {
    it("should find a valid product id", function () {
      const result = cat.findProductById("A123");
      expect(result.name).to.equal("Product 1");
    });
    it("should return undefined for invalid product id", function () {
      const result = cat.findProductById("A321");
      expect(result).to.be.undefined;
    });
  });
  
  describe("removeProductById", () => {
    it("should remove product with a valid id", function () {
      let result = cat.removeProductById("A123");
      expect(result.id).to.equal("A123");
      // Check target state 
      result = cat.findProductById("A123");
      expect(result).to.be.undefined;
    });
    it("should return undefined when asked to remove invalid product", function () {
      const result = cat.removeProductById("A321");
      expect(result).to.be.undefined;
    });
  });
  describe("checkReorder", () => {
    it("should return an empty array when no products need reordering", function () {
      const result = cat.checkReorders();
      expect(result.productIds).to.be.empty;
    });
    it("should report products that satisfy reorder criteria", function () {
      cat.addProduct(new Product("B123", "Product 4", 10, 20, 10.0));
      cat.addProduct(new Product("B124", "Product 5", 10, 30, 10.0));
      const result = cat.checkReorders();
      expect(result.productIds).to.have.lengthOf(2);
      expect(result.productIds).to.have.members(["B123", "B124"]);
    });
    it("should include products just on their reorder level", function () {
      cat.addProduct(new Product("B125", "Product 6", 10, 10, 10.0));
      const result = cat.checkReorders();
      expect(result.productIds).to.have.members(["B125"]);
    });
    it("should handle an empty catalogue", function () {
      cat = new Catalogue("Test catalogue");
      const result = cat.checkReorders();
      expect(result.productIds).to.be.empty;
    });
  });
});