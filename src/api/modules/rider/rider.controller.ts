import { Request, Response } from "express";
import * as httpStatus from "http-status";
import { IRider } from "./rider.interfaces";
import * as RiderService from "./rider.service";
import { ApiError } from "@dinedrop/shared";
import { getRidersWithinRadius } from "../../../loaders/RedisServer";

/**
 * Create a new rider
 */
const addRider = async (req: Request, res: Response) => {
  try {
    const rider: IRider = await RiderService.addRider(req.body);
    res.status(httpStatus.CREATED).json(rider);
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Delete a rider by id
 */
const deleteRider = async (req: Request, res: Response) => {
  try {
    await RiderService.deleteRider(req.params.riderId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Update a rider by id
 */
const updateRider = async (req: Request, res: Response) => {
  try {
    const rider = await RiderService.updateRider(req.params.riderId, req.body);
    res.status(httpStatus.OK).json(rider);
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Get a rider by id
 */
const getRider = async (req: Request, res: Response) => {
  try {
    const rider: IRider | null = await RiderService.getRiderById(
      req.params.riderId
    );
    if (rider) {
      res.status(httpStatus.OK).json(rider);
    } else {
      throw new Error("Rider not found");
    }
  } catch (error: any) {
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

/**
 * Get all riders
 */
const getRiders = async (req: Request, res: Response) => {
  try {
    const riders: IRider[] = await RiderService.getRiders();
    res.status(httpStatus.OK).json({ riders });
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getNearByRiders = async (req: Request, res: Response) => {
  getRidersWithinRadius(req.body.point, (err: any, result: any) => {
    if (err) {
      res.status(httpStatus.NOT_FOUND).send(err);
    }
    res.status(httpStatus.OK).json({
      riders: result,
    });
  });
};

export default {
  addRider,
  deleteRider,
  updateRider,
  getRider,
  getRiders,
  getNearByRiders,
};
