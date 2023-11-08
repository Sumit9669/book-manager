// Module imports
import { Router, Request, Response } from "express";
import { NextFunction } from "express";
import { createValidator } from "express-joi-validation";

// Files imports
import { MessageConstants } from "@constants/response.constants";
import { GeneralHttpExceptions } from "src/custom-exceptions/general-exceptions.constants";
import BooksManagerException from "src/custom-exceptions/books-manager.exception";
import { BooksService } from "../services/books.service";
import { booksUpdateValidation, booksValidation } from "src/schema-validations";
const validator = createValidator({ passError: true });
const basePath = "/books";
const booksSvc = new BooksService();
class BooksRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      `${basePath}`,
      validator.body(booksValidation),
      this.addBook
    );
    this.router.get(`${basePath}`, this.getBookList);
    this.router.patch(
      `${basePath}/:id`,
      validator.body(booksUpdateValidation),
      this.updateBook
    );
    this.router.get(`${basePath}/:id`, this.getBooksDetailById);
    this.router.delete(`${basePath}/:id`, this.deleteBookById);
  }
  /**
   * @swagger
   * /books/{id}:
   *  delete:
   *    summary: Remove book
   *    tags: [Books-Manager]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: To remove book by id
   *    parameters:
   *         - $ref: '#/components/parameters/id'
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'book deleted successfully'
   */
  async deleteBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await booksSvc.deleteBookById(req.params.id);
      return res.json({
        status: true,
        message: MessageConstants.general.deleted,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof BooksManagerException) {
        throw error;
      } else {
        throw new BooksManagerException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /books/{id}:
   *  get:
   *    summary: Manage book by id
   *    tags: [Books-Manager]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: get book detail by id
   *    parameters:
   *         - $ref: '#/components/parameters/id'
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'book detail'
   */
  async getBooksDetailById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await booksSvc.getBookDetailById(req.params.id);
      return res.json({
        status: true,
        message: MessageConstants.general.dataFetch,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof BooksManagerException) {
        throw error;
      } else {
        throw new BooksManagerException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /books/{id}:
   *  patch:
   *    summary: Update book detail
   *    tags: [Books-Manager]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: To update book detail by id
   *    parameters:
   *         - $ref: '#/components/parameters/id'
   *    requestBody:
   *     content:
   *      application/json:
   *       schema:
   *         type: object
   *         properties:
   *           title:
   *             type: string
   *             required: false
   *           author:
   *             type: string
   *             required: false
   *           summary:
   *             type: string
   *             required: false
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'updated successfully'
   */
  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await booksSvc.updateBook(req.params.id, req.body);
      return res.json({
        status: true,
        message: MessageConstants.general.updated,
        metadata: {},
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof BooksManagerException) {
        throw error;
      } else {
        throw new BooksManagerException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /books/:
   *  get:
   *    summary: book details
   *    tags: [Books-Manager]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: Get book list
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'data fetched'
   */
  async getBookList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await booksSvc.getBooksDetail();
      return res.json({
        status: true,
        message: MessageConstants.general.dataFetch,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof BooksManagerException) {
        throw error;
      } else {
        throw new BooksManagerException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /books/:
   *  post:
   *   summary: To create book
   *   description: api to allow user to create book
   *   tags: [Books-Manager]
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *        type: object
   *        properties:
   *          title:
   *            type: string
   *            required: true
   *          author:
   *            type: string
   *            required: true
   *          summary:
   *            type: string
   *            required: true
   *   responses:
   *    '200':
   *       description: success
   *
   *
   */

  async addBook(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await booksSvc.saveBookDetail(req.body);
      return res.json({
        status: true,
        message: MessageConstants.general.saved,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof BooksManagerException) {
        throw error;
      } else {
        throw new BooksManagerException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }
}
export = new BooksRouter().router;
