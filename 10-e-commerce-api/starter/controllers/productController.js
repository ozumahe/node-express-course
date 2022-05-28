const createProduct = async (req, res) => {
  res.send("Create Product");
};

const getAllproducts = async (req, res) => {
  res.send("Get All Products");
};

const getSingleProduct = async (req, res) => {
  res.send("Get Single Product");
};
const updateProduct = async (req, res) => {
  res.send("update Product");
};

const deleteProduct = async (req, res) => {
  res.send("Delete Product");
};

const uploadImage = async (req, res) => {
  res.send("Upload Image");
};

module.exports = {
  createProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
