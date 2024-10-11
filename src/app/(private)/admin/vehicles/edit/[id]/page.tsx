import PageTitle from "@/components/page-title";
import React from "react";
import VehicleForm from "../../_components/vehicle-form";

function EditVehiclePage() {
  return (
    <div>
      <PageTitle title="Edit Vehicle" />
      <VehicleForm type="edit" vehicleData={null} />
    </div>
  );
}

export default EditVehiclePage;
