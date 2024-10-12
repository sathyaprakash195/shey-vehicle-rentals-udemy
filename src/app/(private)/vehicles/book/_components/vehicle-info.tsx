"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IVehicle } from "@/interfaces";
import { Button, Input } from "antd";
import React from "react";

function VehicleInfo({ vehicle }: { vehicle: IVehicle }) {
  const [fromDateAndTime, setFromDateAndTime] = React.useState<string>("");
  const [toDateAndTime, setToDateAndTime] = React.useState<string>("");
  const renderVehicleProperty = (label: string, value: string) => {
    return (
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="p-5 border border-gray-300 border-solid flex flex-col gap-2">
      {renderVehicleProperty("Brand", vehicle.brand)}
      {renderVehicleProperty("Model", vehicle.model)}
      {renderVehicleProperty("Category", vehicle.category)}
      {renderVehicleProperty("Rent Per Hour", `$ ${vehicle.rentPerHour}`)}
      {renderVehicleProperty("Added On", getDateTimeFormat(vehicle.createdAt))}

      <hr className="border border-gray-300 border-solid mt-5" />

      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="fromDateAndTime" className="text-sm">
            From
          </label>
          <Input
            type="datetime-local"
            id="fromDateAndTime"
            onChange={(e: any) => setFromDateAndTime(e.target.value)}
            value={fromDateAndTime}
          />
        </div>

        <div>
          <label htmlFor="toDateAndTime" className="text-sm">
            To
          </label>
          <Input
            type="datetime-local"
            id="toDateAndTime"
            onChange={(e: any) => setToDateAndTime(e.target.value)}
            value={toDateAndTime}
          />
        </div>

        <Button
          type="primary"
          className="mt-5"
          disabled={!fromDateAndTime || !toDateAndTime}
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
}

export default VehicleInfo;
