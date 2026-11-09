import { Router, Request, Response } from "express";

export const router = Router();

import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";

//  new user
router.post("/users", new CreateUserController().handle);

//  authenticate user
router.post("/auth", new AuthUserController().handle);

//  new company
// router.post("/companies");

// //  list comments
// router.get("/comments");

// //  list product
// router.get("/products");

// //  delete user account
// //  authenticated + confirm password
// router.delete("/users");

// //  new comment
// //  authenticated
// router.post("/comments");

// //  delete comments
// //  authenticated
// router.delete("/comments");

// //  new product
// //  authenticated + company account
// router.post("/products");

// //  change product
// //  product_id + company account
// router.put("/products");

// //  new ticket
// //  admin + authenticated
// router.post("/tickets");
