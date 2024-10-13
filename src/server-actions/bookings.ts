"use server";

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
