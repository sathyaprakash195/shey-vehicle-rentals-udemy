import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fromDateAndTime: {
      type: Date,
      required: true,
    },
    toDateAndTime: {
      type: Date,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.bookings) {
  delete mongoose.models.bookings;
}

const BookingModel = mongoose.model("bookings", bookingSchema);
export default BookingModel;
