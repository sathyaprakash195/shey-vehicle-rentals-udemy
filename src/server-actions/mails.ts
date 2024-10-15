"use server";

import { IBooking } from "@/interfaces";
import { getCurrentUserDataFromMongoDB } from "./users";
import { getDateTimeFormat } from "@/helpers/date-time-formats";

const nodemailer = require("nodemailer");
export const sendEmail = async ({
  customerEmail,
  subjectLine,
  htmlContent,
}: {
  customerEmail: string;
  subjectLine: string;
  htmlContent: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: "Shey-Vehicle-Rentals <sathyaprakash195@gmail.com>",
      to: customerEmail,
      subject: subjectLine,
      html: htmlContent,
      text: "",
    });

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendBookingConfirmationEmail = async (booking: IBooking) => {
  try {
    const currentUserResponse = await getCurrentUserDataFromMongoDB();

    const vehicleName =
      typeof booking.vehicle === "object" ? booking.vehicle.name : "N/A";
    const subjectLine = `Booking Confirmation for ${vehicleName}`;

    const fromDateAndTime = getDateTimeFormat(booking.fromDateAndTime);
    const toDateAndTime = getDateTimeFormat(booking.toDateAndTime);
    const totalHours = booking.totalHours;
    const totalAmount = booking.totalAmount;
    const customerName = currentUserResponse.data.name;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border : 1px solid #000;
          }
          .header {
            background-color: #000;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border : 1px solid #000;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #777777;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #000;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>Congratulations! Your booking for <strong>${vehicleName}</strong> has been confirmed.</p>
            <p><strong>Booking Details:</strong></p>
            <table>
              <tr>
                <th>From</th>
                <td>${fromDateAndTime}</td>
              </tr>
              <tr>
                <th>To</th>
                <td>${toDateAndTime}</td>
              </tr>
              <tr>
                <th>Total Hours</th>
                <td>${totalHours} hours</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>$${totalAmount.toFixed(2)}</td>
              </tr>
            </table>
            <p>We look forward to serving you. Have a safe and pleasant journey!</p>
          </div>
          <div class="footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Thank you for choosing us!</p>
          </div>
        </div>
      </body>
    </html>
  `;

    const result = await sendEmail({
      customerEmail: currentUserResponse.data.email,
      subjectLine,
      htmlContent,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendBookingCancellationEmail = async (booking: IBooking) => {
  try {
    const currentUserResponse = await getCurrentUserDataFromMongoDB();

    const vehicleName =
      typeof booking.vehicle === "object" ? booking.vehicle.name : "N/A";
    const subjectLine = `Booking Cancellation for ${vehicleName}`;

    const fromDateAndTime = getDateTimeFormat(booking.fromDateAndTime);
    const toDateAndTime = getDateTimeFormat(booking.toDateAndTime);
    const totalHours = booking.totalHours;
    const totalAmount = booking.totalAmount;
    const customerName = currentUserResponse.data.name;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Cancellation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border : 1px solid #000;
          }
          .header {
            background-color: #000;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border : 1px solid #000;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #777777;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #000;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Cancellation</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>We are sorry to inform you that your booking for <strong>${vehicleName}</strong> has been cancelled.</p>
            <p><strong>Booking Details:</strong></p>
            <table>
              <tr>
                <th>From</th>
                <td>${fromDateAndTime}</td>
              </tr>
              <tr>
                <th>To</th>
                <td>${toDateAndTime}</td>
              </tr>
              <tr>
                <th>Total Hours</th>
                <td>${totalHours} hours</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>$${totalAmount.toFixed(2)}</td>
              </tr>
            </table>
            <p>We apologize for any inconvenience caused. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
            <p>Thank you for considering us!</p>
          </div>
        </div>
      </body>
    </html>
  `;

    const result = await sendEmail({
      customerEmail: currentUserResponse.data.email,
      subjectLine,
      htmlContent,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
