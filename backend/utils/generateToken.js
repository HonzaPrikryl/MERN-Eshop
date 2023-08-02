import jwt from "jsonwebtoken";

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
};

export default generateJwtToken;
