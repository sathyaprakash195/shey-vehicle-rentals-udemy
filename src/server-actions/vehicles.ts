"use server";

import { IVehicle } from "@/interfaces";
import VehicleModel from "@/models/vehicle-model";
import { revalidatePath } from "next/cache";

export const addVehicle = async (payload: Partial<IVehicle>) => {
  try {
    await VehicleModel.create(payload);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      message: "Vehicle added successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllVehicles = async (filters: any) => {
  try {
    let query = {};
    if (filters.category) {
      query = { category: filters.category };
    }

    let sortBy: any = { createdAt: -1 };

    if (filters.sortBy) {
      if (filters.sortBy === "rentPerHour:asc") {
        sortBy = { rentPerHour: 1 };
      } else {
        sortBy = { rentPerHour: -1 };
      }
    }

    const vehicles = await VehicleModel.find(query).sort(sortBy);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(vehicles)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getVehicleById = async (id: string) => {
  try {
    const vehicle = await VehicleModel.findById(id);
    if (!vehicle) {
      return {
        success: false,
        message: "Vehicle not found",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(vehicle)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editVehicleById = async ({
  id,
  vehicleData,
}: {
  id: string;
  vehicleData: Partial<IVehicle>;
}) => {
  try {
    await VehicleModel.findByIdAndUpdate(id, vehicleData);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      message: "Vehicle updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteVehicleById = async (id: string) => {
  try {
    await VehicleModel.findByIdAndDelete(id);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      message: "Vehicle deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
