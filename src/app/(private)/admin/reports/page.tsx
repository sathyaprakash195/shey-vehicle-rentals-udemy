"use client";
import PageTitle from "@/components/page-title";
import React from "react";
import { Tabs } from "antd";
import BookingReports from "./_components/booking-reports";
import VehicleReports from "./_components/vehicle-reports";

function AdminReportsPage() {
  const [bookingReportsData, setBookingReportsData] = React.useState({});
  const [vehicleReportsData, setVehicleReportsData] = React.useState({});

  return (
    <div>
      <PageTitle title="Reports" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <BookingReports />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vehicles" key="2">
           <VehicleReports />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default AdminReportsPage;
