///http:localhost:300/products este ruta sau endpoint!!!!!
let express = require('express');
let router = express.Router();

const productService = require("../service/ProductService");


router.post("/products", (req, res) => {
    let newProduct = productService.addProduct(req.body);
    res.status(200).send(newProduct);
  });
  
  // Read One
router.get("/products/:id", (req, res) => {
    const ProductsList = readJSONFile();
    // Fill in your code here
  });

  // Read All
router.get("/products", (req, res) => {    //  req = request; res = response
    const productsList = productService.getAllProducts();
    if (productsList!==undefined && productsList.length!==0) {
        res.status(200).send(productsList);
    } else {
        res.status(204).send('No product found!');
    }
  });
  
  // Update
  
router.put("/products/:id", (req, res) => {
  let foundProduct = productService.updateProduct(req.params.id, req.body.name, req.body.img);
  if (foundProduct!==null) res.status(200).send(foundProduct);
  else res.status(204).send('No product found');
  });
  
  // Delete
router.delete("/products/:id", (req, res) => {
  let foundProduct = productService.removeProduct(req.params.id);
  if (foundProduct!==null) res.status(200).send(foundProduct);
  else res.status(204).send('No product found');
    
  });

  module.exports = router;
