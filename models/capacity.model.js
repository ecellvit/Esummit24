import mongoose from "mongoose";

const capacitySchema = mongoose.Schema(
  {
    event1: {
      type: Boolean,
      default: false,
    },
    event2: {
      type: Boolean,
      default: false,
    },
    event3: {
      type: Boolean,
      default: false,
    },
    event4: {
      type: Boolean,
      default: false,
    },
    event5: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Capacity" }
);
export const Capacity =
  mongoose.models.Capacity || mongoose.model("Capacity", capacitySchema);
