import PageTitle from "@/components/page-title";
import { getLoggedInUserBookings } from "@/server-actions/bookings";
import { Alert } from "antd";
import React from "react";
import UserBookingsTable from "./_components/user-bookings-table";

async function UserBookingsPage() {
  const {success , data} = await getLoggedInUserBookings();
  if(!success) {
    return <Alert message="Failed to fetch bookings" type="error" />;
  }
  const bookings = data;
  return (
    <div>
      <PageTitle title="My Bookings" />

      <UserBookingsTable data={bookings} />
    </div>
  );
}

export default UserBookingsPage;
