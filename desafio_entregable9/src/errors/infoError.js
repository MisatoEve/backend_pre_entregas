export const generateProductErrorInfo = (product) => {
    return `Required properties:
      title: must be string, recived ${product.title}
      description: must be string, recived ${product.description}
      price: must be number, recived ${product.price}
      code: must be string, recived ${product.code}
      category: must be string, recived ${product.category}`;
  };