class Product {
    constructor(id,name,initialQuantity, reorderLevel, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantityInStock = initialQuantity
        this.reorderLevel = reorderLevel
    }
}


module.exports = Product;