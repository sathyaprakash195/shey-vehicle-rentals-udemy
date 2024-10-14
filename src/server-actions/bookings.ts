"use server";

import { IBooking } from "@/interfaces";
import BookingModel from "@/models/booking-model";
import VehicleModel from "@/models/vehicle-model";

export const checkVehicleAvailabilty = async ({
  fromDateAndTime,
  toDateAndTime,
  vehicleId,
}: {
  fromDateAndTime: string;
  toDateAndTime: string;
  vehicleId: string;
}) => {
  try {
    // logic will be added here

    const bookings = await BookingModel.find({
      vehicle: vehicleId,
      $or: [
        { fromDateAndTime: { $gte: fromDateAndTime, $lt: toDateAndTime } },
        {
          toDateAndTime: { $gt: fromDateAndTime, $lte: toDateAndTime },
        },
        {
          fromDateAndTime: { $lte: fromDateAndTime },
          toDateAndTime: { $gte: toDateAndTime },
        },
      ],
    });

    if (bookings.length > 0) {
      return {
        success: false,
        message: "Vehicle not available for selected time",
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const saveNewBooking = async (payload: Partial<IBooking>) => {
  try {
    const booking = await BookingModel.create(payload);

    await VehicleModel.findByIdAndUpdate(payload.vehicle, {
      status: "in-ride",
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(booking)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
