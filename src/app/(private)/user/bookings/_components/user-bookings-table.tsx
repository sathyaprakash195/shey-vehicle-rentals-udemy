"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IBooking, IVehicle } from "@/interfaces";
import { Button, message, Table } from "antd";
import { X, Mail } from "lucide-react";
import React from "react";
import CancelBookingModal from "./cancel-booking-modal";
import dayjs from "dayjs";
import { sendBookingConfirmationEmail } from "@/server-actions/mails";

function UserBookingsTable({ data }: { data: IBooking[] }) {
  const [selectedBooking, setSelectedBooking] = React.useState<IBooking | null>(
    null
  );
  const [showCancelBookingModal, setShowCancelBookingModal] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const sendEmailHandler = async (booking: IBooking) => {
    try {
      setLoading(true);
      const { success } = await sendBookingConfirmationEmail(booking);
      if (success) {
        message.success("Email sent successfully");
      } else {
        message.error("Failed to send email");
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
      render: (text: string) => text.toUpperCase(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: IBooking) => {
        const showCancelButton =
          record.status === "booked" &&
          dayjs(record.fromDateAndTime).isAfter(dayjs());
        if (!showCancelButton) {
          return <></>;
        }
        return (
          <div className="flex gap-5">
            <Button
              icon={<X size={14} />}
              size="small"
              onClick={() => {
                setSelectedBooking(record);
                setShowCancelBookingModal(true);
              }}
            >
              Cancel
            </Button>
            <Button
              icon={<Mail size={14} />}
              size="small"
              onClick={() => sendEmailHandler(record)}
            >
              Send Email
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      {showCancelBookingModal && (
        <CancelBookingModal
          showCancelBookingModal={showCancelBookingModal}
          setShowCancelBookingModal={setShowCancelBookingModal}
          selectedBooking={selectedBooking as IBooking}
        />
      )}
    </div>
  );
}

export default UserBookingsTable;
