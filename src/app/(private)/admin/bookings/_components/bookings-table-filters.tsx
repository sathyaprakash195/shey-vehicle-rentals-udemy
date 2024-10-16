"use client";
import React from "react";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/navigation";

const statusOptions = [
  {
    label: "All",
    value: "all",
  },
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

function BookingsTableFilters() {
  const [fromDateAndTime, setFromDateAndTime] = React.useState("");
  const [toDateAndTime, setToDateAndTime] = React.useState("");
  const [status = "all", setStatus] = React.useState("all");
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/bookings?fromDateAndTime=${fromDateAndTime}&toDateAndTime=${toDateAndTime}&status=${status}`
    );
  };

  const onClear = () => {
    setFromDateAndTime("");
    setToDateAndTime("");
    router.push("/admin/bookings");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
      <div>
        <label htmlFor="From date and time" className="text-sm">
          From date and time
        </label>
        <Input
          value={fromDateAndTime}
          onChange={(e) => setFromDateAndTime(e.target.value)}
          type="datetime-local"
        />
      </div>

      <div>
        <label htmlFor="To date and time" className="text-sm">
          To date and time
        </label>
        <Input
          value={toDateAndTime}
          onChange={(e) => setToDateAndTime(e.target.value)}
          type="datetime-local"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Status" className="text-sm">
          Status
        </label>
        <Select
          options={statusOptions}
          value={status}
          onChange={(value) => setStatus(value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Button onClick={onClear} type="default">
          Clear
        </Button>
        <Button type="primary" onClick={onFilter}>
          Filter
        </Button>
      </div>
    </div>
  );
}

export default BookingsTableFilters;
