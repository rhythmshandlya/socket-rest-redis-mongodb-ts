import { QueryResult } from "@dinedrop/shared";
import { Model, Schema, Document } from "mongoose";

export interface IRider extends Document {
  name: string;
  city: string;
  description: string;
  image: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt: Date;
}
