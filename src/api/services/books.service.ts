// File imports
import { HttpService } from "@shared/http.service";
import { MessageConstants } from "@constants/response.constants";
import { GeneralHttpExceptions } from "src/custom-exceptions/general-exceptions.constants";
import { CommonFunctions } from "@shared/common-functions";
import { SchemaSet } from "@constants/common.constants";
import BooksManagerException from "src/custom-exceptions/books-manager.exception";
import app from "@server";

const commonFunction = new CommonFunctions();

export class BooksService {
  httpService: HttpService;
  constructor() {
    this.httpService = new HttpService();
  }

  /**
   * Save Book details
   * @param bookData Book details to be saved
   */
  async saveBookDetail(bookData: any): Promise<any> {
    const dbConn = app.get("DB");
    const booksModel = await dbConn.model(
      SchemaSet.booksConfig.name,
      SchemaSet.booksConfig.schema
    );
    const newBook = new booksModel(bookData);
    const bookDetail = await newBook.save();
    return bookDetail;
  }

  /**
   * Save Book details
   * @param bookData Book details to be saved
   */
  async getBooksDetail(): Promise<any> {
    const dbConn = app.get("DB");
    const booksModel = await dbConn.model(
      SchemaSet.booksConfig.name,
      SchemaSet.booksConfig.schema
    );

    const bookDetail = await booksModel.find({});
    return bookDetail;
  }

  /**
   * Save Book details
   * @param bookData Book details to be saved
   */
  async getBookDetailById(bookId: any): Promise<any> {
    const dbConn = app.get("DB");
    const booksModel = await dbConn.model(
      SchemaSet.booksConfig.name,
      SchemaSet.booksConfig.schema
    );
    const bookDetail = await booksModel.findOne({
      _id: bookId,
    });
    return bookDetail;
  }

  /**
   * @description
   * To update book record
   * @param bookId , pass bookId
   * @param bookData, pass bookData
   * @returns true after success updating record
   */
  async updateBook(bookId: string, bookData: any): Promise<boolean> {
    const dbConn = app.get("DB");
    const booksModel = await dbConn.model(
      SchemaSet.booksConfig.name,
      SchemaSet.booksConfig.schema
    );
    const updatedBookDetail = await booksModel.findOneAndUpdate(
      { _id: bookId },
      bookData,
      { lean: true, new: true }
    );
    if (!updatedBookDetail) {
      throw new BooksManagerException(
        GeneralHttpExceptions.EntityNotFoundException,
        MessageConstants.general.entityNotFound,
        new Error().stack
      );
    }
    return true;
  }

  async deleteBookById(bookId: string): Promise<boolean> {
    const dbConn = app.get("DB");
    const booksModel = await dbConn.model(
      SchemaSet.booksConfig.name,
      SchemaSet.booksConfig.schema
    );
    const deleteBook = await booksModel.deleteOne({ _id: bookId });
    if (!deleteBook) {
      throw new BooksManagerException(
        GeneralHttpExceptions.EntityNotFoundException,
        MessageConstants.general.entityNotFound,
        new Error().stack
      );
    }
    return true;
  }
}
