import { Document, Schema, model } from "mongoose";
import { IRider } from "./rider.interfaces";

const RiderSchema = new Schema<IRider>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

RiderSchema.index({ location: "2dsphere" });

export default model<IRider>("Rider", RiderSchema);
