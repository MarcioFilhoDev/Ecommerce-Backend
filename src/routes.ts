import { Router, Request, Response } from "express";

export const router = Router();

import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { CreateCompanyController } from "./controllers/companies/CreateCompanyController";
import { AuthCompanyController } from "./controllers/companies/AuthCompanyController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { ValidateSchema } from "./middlewares/validateSchema";
import { ProductSchema } from "./schemas/productSchema";
import { GetProductController } from "./controllers/products/GetProductController";
import {
  AuthUserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "./schemas/userSchema";
import {
  AuthCompanySchema,
  CreateCompanySchema,
} from "./schemas/companySchema";
import { UpdateUserController } from "./controllers/users/UpdateUserController";

//  new user
router.post(
  "/users",
  ValidateSchema(CreateUserSchema),
  new CreateUserController().handle,
);

//  authenticate user
router.post(
  "/users/auth",
  ValidateSchema(AuthUserSchema),
  new AuthUserController().handle,
);

router.put(
  "/users/me",
  isAuthenticated,
  ValidateSchema(UpdateUserSchema),
  new UpdateUserController().handle,
);

//  new company
router.post(
  "/companies",
  ValidateSchema(CreateCompanySchema),
  new CreateCompanyController().handle,
);

//  authenticate company
router.post(
  "/companies/auth",
  ValidateSchema(AuthCompanySchema),
  new AuthCompanyController().handle,
);

// //  list comments
// router.get("/comments");

// //  list product
router.get("/products", new GetProductController().hanlde);

// //  delete user account
// //  authenticated + confirm password
router.delete("/users", isAuthenticated, new DeleteUserController().handle);

// //  new comment
// //  authenticated
// router.post("/comments");

// //  delete comments
// //  authenticated
// router.delete("/comments");

// //  new product
// //  authenticated + company account
router.post(
  "/products",
  isAuthenticated,
  ValidateSchema(ProductSchema),
  new CreateProductController().handle,
);

// //  change product
// //  product_id + company account
// router.put("/products");

// //  new ticket
// //  admin + authenticated
// router.post("/tickets");
