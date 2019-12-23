const { Router } = require('express');
const router = Router();

router.get("/", async (req, res) => {
  const { filters } = req.body;

  const products = req.app.get('db').Product.find({});

  const productMap = {};
  products.forEach(product => {
    productMap[product._id] = product;
  });

  res.status(200).json({
    status: 200,
    statusText: "OK",
    result: {
      products: productMap
    }
  })
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = req.app.get('db').Product.findById(id);
  if (!product) {
    res.status(404).json({
      status: 404,
      statusText: "Not Found"
    });
  } else {
    res.status(200).json({
      status: 200,
      statusText: "OK",
      result: {
        product
      }
    })
  }
});

module.exports = router;