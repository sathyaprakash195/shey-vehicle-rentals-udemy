import PageTitle from "@/components/page-title";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

function VehiclesListPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Vehicles" />
        <Button type="primary">
          <Link href="/admin/vehicles/add">Add Vehicle</Link>
        </Button>
      </div>
    </div>
  );
}

export default VehiclesListPage;
