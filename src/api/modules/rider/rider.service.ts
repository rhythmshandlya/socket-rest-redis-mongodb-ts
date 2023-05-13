import Rider from "./rider.model";
import { IRider } from "./rider.interfaces";
import * as httpStatus from "http-status";

export const addRider = async ({
  name,
  city,
  description,
  image,
}: {
  name: string;
  city: string;
  description: string;
  image?: string;
}): Promise<IRider> => {
  const rider = new Rider({
    name,
    city,
    description,
    image,
  });
  await rider.save();
  return rider.toObject();
};

export const deleteRider = async (riderId: string) => {
  await Rider.findByIdAndDelete(riderId);
};

export const updateRider = async (
  riderId: string,
  {
    name,
    city,
    description,
    image,
  }: {
    name: string;
    city: string;
    description: string;
    image?: string;
  }
) => {
  const update: { [key: string]: any } = {};
  if (name) update.name = name;
  if (city) update.city = city;
  if (description) update.description = description;
  if (image) update.image = image;
  const newRider = await Rider.findByIdAndUpdate(riderId, update, {
    new: true,
  });
  return newRider;
};

export const getRiderById = async (riderId: string): Promise<IRider | null> => {
  return await Rider.findById(riderId).lean();
};

export const getRiders = async (): Promise<IRider[]> => {
  return await Rider.find().lean();
};
