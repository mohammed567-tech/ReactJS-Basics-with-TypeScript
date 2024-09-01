export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    color: string;
  } = { title: "", description: "", imageURL: "", price: "", color: "" };
  const validUrlImage = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  if (
    !product.title.trim() ||
    product.title.length > 80 ||
    product.title.length < 10
  ) {
    errors.title = "Product Title Must Be Between 10 and 80 Character";
  }
  if (
    !product.description.trim() ||
    product.description.length > 900 ||
    product.description.length < 10
  ) {
    errors.description =
      "Product description Must Be Between 10 and 900 Character";
  }
  if (!product.imageURL.trim() || !validUrlImage) {
    errors.imageURL = "fill correct image url";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "this is not a number";
  }
  if (!product.colors || product.colors.length === 0) {
    errors.color = "Please select at least one color ";
  }
  return errors;
};
