import { products } from "../dummy-data/products.js";

export const getProducts = function (_, res) {
  res.status(200).send(products);
};

export const getProduct = function (req, res) {
  const id = req.params.id;
  if (id) {
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) {
      res.status(404).send({ message: `Error: Product ${id} doesn't exists.` });
    }
    res.status(200).send(foundProduct);
  }
};
