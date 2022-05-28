const uuid = require("uuid");
const productRepository = require("../repository/ProductRepository")

module.exports.getAllProducts = () =>{
    const productsList = productRepository.readJSONFile();
    return productsList;
}

module.exports.addProduct = (newProduct) =>{
    const productsList = productRepository.readJSONFile();
    newProduct.id = uuid.v4.apply();
    productsList.push(newProduct);
    productRepository.writeJSONFile(productsList);
    return newProduct;
}

module.exports.updateProduct = (productID, productName, productImg) => {
    const productList = productRepository.readJSONFile();
  
    let foundProduct=null;
    for (let i=0; i<productList.length; i++) 
        if (productList[i].id===productID) {
            productList[i].name=productName;
            productList[i].img=productImg;
            foundProduct=productList[i];
            break;
        }
  
    productRepository.writeJSONFile(productList);
    return foundProduct;
}

 module.exports.removeProduct = (productID) => {
     const productsList = productRepository.readJSONFile();
    
       for (let i=0; i<productsList.length; i++) 
           if (productsList[i].id===productID) {
               productsList.splice(i, 1);
               foundProduct=productsList[i];
               break;
           }
    
    productRepository.writeJSONFile(productsList);
    return foundProduct
 }