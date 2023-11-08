import * as mongoose from "mongoose";

export interface IBooks extends mongoose.Document {
  title: string;
  author: string;
  description: number;
  createdAt: string;
  updatedAt: string;
}
