import PageTitle from "@/components/page-title";
import { getAllVehicles } from "@/server-actions/vehicles";
import { Alert } from "antd";
import React from "react";
import VehicleCard from "./_components/vehicle-card";
import CategoryFilters from "./_components/category-filters";
import SortVehicles from "./_components/sort-vehicles";

interface IVehiclesPageProps {
  searchParams : {
    category: string;
  }
}

async function VehiclesPage({ searchParams }: IVehiclesPageProps) {
  const { success, data } = await getAllVehicles(searchParams);
  if (!success) {
    return <Alert message="Failed to fetch vehicles" type="error" />;
  }
  return (
    <div>
      <PageTitle title="Vehicles" />

      <div className="flex justify-between items-center">
        <CategoryFilters />
        <SortVehicles />
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((vehicle: any) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>


      {Object.keys(searchParams).length > 0 && data.length === 0 && (
        <Alert message="No vehicles found in selected category" type="info" />
      )}
    </div>
  );
}

export default VehiclesPage;
