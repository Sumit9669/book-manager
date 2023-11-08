import { BooksSchema } from "src/entitites/books-schema.entity";
import { MongoCollections } from "./mongo.constant";

export const CommonFormat = {
  dateTime: "YYYY-MM-DD hh:mm:ss",
  date: "YYYY-MM-DD",
};

export const ExceptionsTerminology = {
  recordAlreadyExists: "RecordExists",
  generalException: "GeneralError",
  entityNotFound: "EntityNotFoundError",
  entitiesNotFound: "EnititesNotFoundError",
  validationException: "RequestValidationError",
  internalServerException: "InternalServerError",
  headerMissing: "HeaderMissing",
  endPointNotFoundException: "EndPointNotFoundError",
  serviceUnavailableException: "EndPointNotFoundError",
  unAuthorisedTokenException: "UnAuthorisedTokenError",
  invalidRequest: "InvalidRequestError",
};

export const SchemaSet = {
  booksConfig: { name: MongoCollections.books, schema: BooksSchema },
};
