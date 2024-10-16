"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IBooking } from "@/interfaces";
import { updateBookingStatus } from "@/server-actions/bookings";
import { message, Table } from "antd";
import React from "react";

const statusOptions = [
  {
    label: "Booked",
    value: "booked",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "In-Ride",
    value: "in-ride",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

function AdminBookingsTable({ bookings }: { bookings: IBooking[] }) {
  const [loading, setLoading] = React.useState(false);

  const updateStatusHandler = async (status: string, bookingId: string) => {
    try {
      setLoading(true);
      const { success } = await updateBookingStatus({ status, bookingId });
      if (success) {
        message.success("Booking status updated successfully");
      } else {
        message.error("Failed to update booking status");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (text: string, record: IBooking) =>
        typeof record.vehicle === "object" ? record.vehicle.name : "N/A",
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (text: string, record: IBooking) =>
        typeof record.user === "object" ? record.user.name : "N/A",
    },
    {
      title: "From",
      dataIndex: "fromDateAndTime",
      key: "fromDateAndTime",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "To",
      dataIndex: "toDateAndTime",
      key: "toDateAndTime",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      key: "totalHours",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: IBooking) => (
        <div>
          <select
            value={text}
            className="border border-gray-500 rounded-sm p-1"
            onChange={(e) => updateStatusHandler(e.target.value, record._id)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ),
    },
  ];
  return (
    <Table
      dataSource={bookings}
      columns={columns}
      rowKey="_id"
      loading={loading}
      pagination={false}
    />
  );
}

export default AdminBookingsTable;
