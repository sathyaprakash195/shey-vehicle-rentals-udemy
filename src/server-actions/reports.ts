"use server";

import BookingModel from "@/models/booking-model";
import VehicleModel from "@/models/vehicle-model";
import { getCurrentUserDataFromMongoDB } from "./users";
import mongoose from "mongoose";

export const getBookingReports = async () => {
  try {
    const [
      totalBookingsCount,
      totalBookingsRevenue,
      cancelledBookingsCount,
      cancelledBookingsRevenue,
    ] = await Promise.all([
      BookingModel.countDocuments({}),
      BookingModel.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
      BookingModel.countDocuments({ status: "cancelled" }),
      BookingModel.aggregate([
        {
          $match: {
            status: "cancelled",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    return {
      success: true,
      data: {
        totalBookingsCount,
        totalBookingsRevenue: totalBookingsRevenue[0].totalRevenue,
        cancelledBookingsCount,
        cancelledBookingsRevenue: cancelledBookingsRevenue[0].totalRevenue,
        netRevenue:
          totalBookingsRevenue[0].totalRevenue -
          cancelledBookingsRevenue[0].totalRevenue,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getVehicleReports = async () => {
  try {
    const [
      totalVehiclesCount,
      activeVehiclesCount,
      inactiveVehiclesCount,
      availablesVehiclesCount,
      inrideVehiclesCount,
    ] = await Promise.all([
      VehicleModel.countDocuments({}),
      VehicleModel.countDocuments({ isActive: true }),
      VehicleModel.countDocuments({ isActive: false }),
      VehicleModel.countDocuments({ status: "available", isActive: true }),
      VehicleModel.countDocuments({ status: "in-ride" }),
    ]);

    return {
      success: true,
      data: {
        totalVehiclesCount,
        activeVehiclesCount,
        inactiveVehiclesCount,
        availablesVehiclesCount,
        inrideVehiclesCount,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getLoggedInUserBookingReports = async () => {
  try {
    const loggedinUser = await getCurrentUserDataFromMongoDB();
    const userId = new mongoose.Types.ObjectId(loggedinUser.data._id);
    const [
      totalBookingsCount,
      totalBookingsRevenue,
      cancelledBookingsCount,
      cancelledBookingsRevenue,
    ] = await Promise.all([
      BookingModel.countDocuments({ user: userId }),
      BookingModel.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
      BookingModel.countDocuments({ status: "cancelled", user: userId }),
      BookingModel.aggregate([
        {
          $match: {
            status: "cancelled",
            user: userId,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    let totalBookingsRevenueTemp = 0;
    if (totalBookingsRevenue.length > 0) {
      totalBookingsRevenueTemp = totalBookingsRevenue[0].totalRevenue;
    }

    let cancelledBookingsRevenueTemp = 0;
    if (cancelledBookingsRevenue.length > 0) {
      cancelledBookingsRevenueTemp = cancelledBookingsRevenue[0].totalRevenue;
    }

    return {
      success: true,
      data: {
        totalBookingsCount,
        totalBookingsRevenue: totalBookingsRevenueTemp,
        cancelledBookingsCount,
        cancelledBookingsRevenue: cancelledBookingsRevenueTemp,
        netRevenue: totalBookingsRevenueTemp - cancelledBookingsRevenueTemp,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
