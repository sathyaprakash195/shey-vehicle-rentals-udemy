import ReportCard from "@/components/report-card";
import { getBookingReports } from "@/server-actions/reports";
import { message } from "antd";
import React from "react";

function BookingReports() {
  const [data, setData] = React.useState({
    totalBookingsCount: 0,
    totalBookingsRevenue: 0,
    cancelledBookingsCount: 0,
    cancelledBookingsRevenue: 0,
    netRevenue: 0,
  });

  const getData = async () => {
    try {
      const { success, data }: any = await getBookingReports();
      if (success) {
        setData(data);
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
        label="Total Bookings"
        value={data.totalBookingsCount}
        isCurrency={false}
        description="Total number of bookings made by customers."
      />

      <ReportCard
        label="Total Revenue"
        value={data.totalBookingsRevenue}
        isCurrency={true}
        description="Total revenue generated from bookings."
      />

      <ReportCard
        label="Cancelled Bookings"
        value={data.cancelledBookingsCount}
        isCurrency={false}
        description='Total number of bookings that were cancelled by customers.'
      />

        <ReportCard
            label="Cancelled Revenue"
            value={data.cancelledBookingsRevenue}
            isCurrency={true}
            description="Total revenue lost from cancelled bookings."
        />

      <ReportCard
        label="Net Revenue"
        value={data.netRevenue}
        isCurrency={true}
        description="Total revenue generated from bookings after deducting cancelled bookings."
      />
    </div>
  );
}

export default BookingReports;
