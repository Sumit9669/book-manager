// Module imports
import mongoose, { Schema } from "mongoose";
import { MongoCollections } from "@constants/mongo.constant";
import { IBooks } from "./interfaces/books.interface";

/** mongoose schema for API Secret saving
 */
export const BooksSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: false,
    },
    summary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const booksModel = mongoose.model<IBooks>(
  MongoCollections.books,
  BooksSchema
);
