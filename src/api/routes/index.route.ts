import { Router } from "express";
import BooksRouter from "./books.routes";

class BaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.use("/", BooksRouter);
  }
}

export = new BaseRouter().router;
