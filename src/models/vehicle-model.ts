import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    rentPerHour: {
      type: Number,
      required: true,
    },
    media: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "available",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.vehicles) {
  delete mongoose.models.vehicles;
}

const VehicleModel = mongoose.model("vehicles", vehicleSchema);
export default VehicleModel;
