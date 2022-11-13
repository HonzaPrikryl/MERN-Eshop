import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true,
  },
  {
    name: "Client1",
    email: "client1@example.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    name: "Client2",
    email: "client2@example.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export default users;
