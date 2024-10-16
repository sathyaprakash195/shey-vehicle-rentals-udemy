import ReportCard from "@/components/report-card";
import { getVehicleReports } from "@/server-actions/reports";
import { message } from "antd";
import React from "react";

function VehicleReports() {
  const [data, setData] = React.useState({
    totalVehiclesCount: 0,
    activeVehiclesCount: 0,
    inactiveVehiclesCount: 0,
    availablesVehiclesCount: 0,
    inrideVehiclesCount: 0,
  });

  const getData = async () => {
    try {
      const { data, success }: any = await getVehicleReports();
      if (success) {
        setData(data);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      <ReportCard
        label="Total Vehicles"
        value={data.totalVehiclesCount}
        description="Total number of vehicles in the system"
      />

      <ReportCard
        label="Active Vehicles"
        value={data.activeVehiclesCount}
        description="Total number of active vehicles"
      />

      <ReportCard
        label="Inactive Vehicles"
        value={data.inactiveVehiclesCount}
        description="Total number of inactive vehicles"
      />

      <ReportCard
        label="Available Vehicles"
        value={data.availablesVehiclesCount}
        description="Total number of available vehicles"
      />

      <ReportCard
        label="In-ride Vehicles"
        value={data.inrideVehiclesCount}
        description="Total number of vehicles currently in-ride"
      />
    </div>
  );
}

export default VehicleReports;
