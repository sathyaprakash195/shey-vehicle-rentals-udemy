"use server";

import { IBooking } from "@/interfaces";
import BookingModel from "@/models/booking-model";
import VehicleModel from "@/models/vehicle-model";
import { getCurrentUserDataFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import { sendBookingConfirmationEmail, sendEmail } from "./mails";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
      status: { $ne: "cancelled" },
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
    const booking: any = await BookingModel.create(payload);

    const bookingDoc: any = await BookingModel.findById(booking._id).populate(
      "vehicle"
    );

    sendBookingConfirmationEmail(bookingDoc);

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

export const getLoggedInUserBookings = async () => {
  try {
    const loggedinUserResponse = await getCurrentUserDataFromMongoDB();

    if (!loggedinUserResponse.success) {
      return {
        success: false,
        message: loggedinUserResponse.message,
      };
    }

    const userBookings = await BookingModel.find({
      user: loggedinUserResponse.data._id,
    })
      .populate("vehicle")
      .sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(userBookings)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const cancelBooking = async ({
  bookingId = "",
  paymentId = "",
}: {
  bookingId: string;
  paymentId?: string;
}) => {
  try {
    await BookingModel.findByIdAndUpdate(bookingId, {
      status: "cancelled",
    });

    // issue refund to customer based on company policy
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });
    revalidatePath("/user/bookings");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(refund)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllBookings = async ({
  fromDateAndTime = "",
  toDateAndTime = "",
  status = "",
}: {
  fromDateAndTime?: string;
  toDateAndTime?: string;
  status?: string;
}) => {
  try {
    let query = {};
    if (fromDateAndTime && toDateAndTime) {
      query = {
        fromDateAndTime: { $gte: fromDateAndTime, $lt: toDateAndTime },
      };
    }

    if (status && status !== "all") {
      query = {
        ...query,
        status,
      };
    }

    const bookings = await BookingModel.find(query)
      .populate("vehicle")
      .populate("user")
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookings)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateBookingStatus = async ({
  bookingId,
  vehicleId,
  status,
}: {
  bookingId: string;
  status: string;
  vehicleId: string;
}) => {
  try {
    await BookingModel.findByIdAndUpdate(bookingId, {
      status,
    });

    let vehicleStatus = "available";

    if (status === "inride") {
      vehicleStatus = "in-ride";
    }

    await VehicleModel.findByIdAndUpdate(vehicleId, {
      status: vehicleStatus,
    });

    revalidatePath("/admin/bookings");
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
