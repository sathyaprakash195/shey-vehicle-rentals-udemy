import PageTitle from "@/components/page-title";
import ReportCard from "@/components/report-card";
import ServerComponentsSpinner from "@/components/server-components-spinner";
import { getLoggedInUserBookingReports } from "@/server-actions/reports";
import { Alert } from "antd";
import React, { Suspense } from "react";

async function UserReportsPage() {
  const { success, data }: any = await getLoggedInUserBookingReports();
  if (!success) {
    return <Alert message="Failed to fetch reports" type="error" />;
  }
  return (
    <div>
      <PageTitle title="Reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-5">
        <ReportCard
          label="Total Bookings"
          value={data.totalBookingsCount}
          isCurrency={false}
          description="Total number of bookings made by current user."
        />

        <ReportCard
          label="Total Amount Spent"
          value={data.totalBookingsRevenue}
          isCurrency={true}
          description="Total amount spent on bookings by current user."
        />

        <ReportCard
          label="Cancelled Bookings"
          value={data.cancelledBookingsCount}
          isCurrency={false}
          description="Total number of bookings that were cancelled by current user."
        />

        <ReportCard
          label="Cancelled Bookings Amount"
          value={data.cancelledBookingsRevenue}
          isCurrency={true}
          description="Total amount of bookings that were cancelled by current user."
        />

        <ReportCard
          label="Net Amount Spent"
          value={data.netRevenue}
          isCurrency={true}
          description="Net amount spent on bookings by current user."
        />
      </div>
    </div>
  );
}

export default function UserReportsPageWrapper() {
  return (
    <Suspense fallback={<ServerComponentsSpinner />}>
      <UserReportsPage />
    </Suspense>
  );
}
