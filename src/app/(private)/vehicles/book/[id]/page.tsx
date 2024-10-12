import ServerComponentsSpinner from "@/components/server-components-spinner";
import { IVehicle } from "@/interfaces";
import { getVehicleById } from "@/server-actions/vehicles";
import { Alert } from "antd";
import React, { Suspense } from "react";
import VehicleMediaCarousel from "../_components/vehicle-media-carousel";
import VehicleInfo from "../_components/vehicle-info";

interface IVehicleBookingPageProps {
  params: {
    id: string;
  };
}

async function VehicleBookingPage({ params }: IVehicleBookingPageProps) {
  const { success, data } = await getVehicleById(params.id);
  if (!success) {
    return <Alert message="Failed to fetch vehicle" type="error" />;
  }

  const vehicle: IVehicle = data;
  return (
    <div>
      <h1 className="text-xl font-bold">{vehicle.name}</h1>

      <div className="grid lg:grid-cols-3 gap-10 mt-5">
        <div className="col-span-2">
          <VehicleMediaCarousel vehicle={vehicle} />
        </div>

        <div className="col-span-1">
          <VehicleInfo vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}

export default function VehicleBookingPageWithSuspence(props: any) {
  return (
    <Suspense fallback={<ServerComponentsSpinner />}>
      <VehicleBookingPage {...props} />
    </Suspense>
  );
}
