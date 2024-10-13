"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IVehicle } from "@/interfaces";
import { checkVehicleAvailabilty } from "@/server-actions/bookings";
import { getStripePaymentIntent } from "@/server-actions/payments";
import { Button, Input, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";
import React from "react";
import CreditCardForm from "./credit-card-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function VehicleInfo({ vehicle }: { vehicle: IVehicle }) {
  const [fromDateAndTime, setFromDateAndTime] = React.useState<string>("");
  const [toDateAndTime, setToDateAndTime] = React.useState<string>("");
  const [isAvailable, setIsAvailable] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = React.useState<string>("");
  const [openCreditCardForm, setOpenCreditCardForm] =
    React.useState<boolean>(false);

  const totalHours = dayjs(toDateAndTime).diff(dayjs(fromDateAndTime), "hour");
  const totalAmount = totalHours * vehicle.rentPerHour;

  const renderVehicleProperty = (label: string, value: string) => {
    return (
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  const checkAvailabilityHandler = async () => {
    try {
      setLoading(true);
      const { success } = await checkVehicleAvailabilty({
        fromDateAndTime,
        toDateAndTime,
        vehicleId: vehicle._id,
      });
      if (success) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (error: any) {
      setIsAvailable(false);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStripePaymentIntentHandler = async () => {
    try {
      setLoading(true);
      const { success, data } = await getStripePaymentIntent(totalAmount);
      if (success) {
        setPaymentIntentId(data.client_secret);
        setOpenCreditCardForm(true);
      } else {
        message.error("Failed to get payment intent");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPaymentSuccess = (paymentId:string) => {
    try {
        // save booking details
        // redirect to user bookings page
    } catch (error: any) {
      message.error(error.message);
        
    }
  }

  const onClear = () => {
    setFromDateAndTime("");
    setToDateAndTime("");
    setIsAvailable(false);
  };

  const options = {
    clientSecret: paymentIntentId,
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
            disabled={isAvailable}
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
            disabled={isAvailable}
          />
        </div>

        {!isAvailable && (
          <Button
            type="primary"
            className="mt-5"
            disabled={!fromDateAndTime || !toDateAndTime}
            onClick={checkAvailabilityHandler}
            loading={loading}
          >
            Check Availability
          </Button>
        )}

        {isAvailable && (
          <div className="flex flex-col gap-2 mt-5">
            {renderVehicleProperty("Total Hours", totalHours.toString())}
            {renderVehicleProperty("Total Amount", `$ ${totalAmount}`)}

            <div className="grid grid-cols-2 gap-5">
              <Button onClick={onClear}>Clear</Button>
              <Button
                type="primary"
                onClick={getStripePaymentIntentHandler}
                loading={loading}
              >
                Book
              </Button>
            </div>
          </div>
        )}
      </div>

      {openCreditCardForm && (
        <Elements stripe={stripePromise} options={options}>
          <CreditCardForm
            openCreditCardForm={openCreditCardForm}
            setOpenCreditCardForm={setOpenCreditCardForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
}

export default VehicleInfo;