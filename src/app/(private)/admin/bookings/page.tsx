import PageTitle from "@/components/page-title";
import { getAllBookings } from "@/server-actions/bookings";
import { Alert } from "antd";
import React, { Suspense } from "react";
import AdminBookingsTable from "./_components/admin-bookings-table";
import BookingsTableFilters from "./_components/bookings-table-filters";
import ServerComponentsSpinner from "@/components/server-components-spinner";

interface AdminBokingsPageProps {
  searchParams: {
    fromDateAndTime?: string;
    toDateAndTime?: string;
    status?: string;
  };
}

async function AdminBokingsPage({ searchParams }: AdminBokingsPageProps) {
  const { success, data } = await getAllBookings({
    fromDateAndTime: searchParams.fromDateAndTime || "",
    toDateAndTime: searchParams.toDateAndTime || "",
    status: searchParams.status || "all",
  });
  if (!success) {
    return <Alert message="Failed to fetch bookings" type="error" />;
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="All Bookings" />

      <BookingsTableFilters />

      <AdminBookingsTable bookings={data} />
    </div>
  );
}

export default function AdminBokingsPageWrapper(props: any) {
  return (
    <Suspense fallback={<ServerComponentsSpinner />}>
      <AdminBokingsPage {...props} />
    </Suspense>
  );
}
