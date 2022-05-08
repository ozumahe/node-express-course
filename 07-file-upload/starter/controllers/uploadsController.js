const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomErrors = require("../errors");

const uploadImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomErrors.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomErrors.BadRequestError("Please Upload Image");
  }

  const imageSize = 1024 * 1024;

  if (productImage.size > imageSize) {
    throw new CustomErrors.BadRequestError(
      "Plase Upload Image Smaller Than 1kb"
    );
  }

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

const uploadImage = async (req, res) => {
  res.status(StatusCodes.OK).send("Upload Image");
};

module.exports = { uploadImage };
