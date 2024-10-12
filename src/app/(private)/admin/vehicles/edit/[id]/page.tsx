import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import VehicleForm from "../../_components/vehicle-form";
import { getVehicleById } from "@/server-actions/vehicles";
import { Alert } from "antd";
import ServerComponentsSpinner from "@/components/server-components-spinner";

interface IEditVehiclePageProps {
  params: {
    id: string;
  };
}

async function EditVehiclePage({ params }: IEditVehiclePageProps) {
  const { success, data } = await getVehicleById(params.id);
  if (!success) {
    return <Alert message="Failed to fetch vehicle" type="error" />;
  }
  return (
    <div>
      <PageTitle title="Edit Vehicle" />
      <VehicleForm type="edit" vehicleData={data} />
    </div>
  );
}

export default function EditVehiclePageWithSuspence(
  props: IEditVehiclePageProps
) {
  return (
    <Suspense fallback={<ServerComponentsSpinner />}>
      <EditVehiclePage {...props} />
    </Suspense>
  );
}
