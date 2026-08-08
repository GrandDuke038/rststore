import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Reply sender is required"],
    },
    message: {
      type: String,
      required: [true, "Reply message is required"],
      trim: true,
      maxlength: [5000, "Reply message cannot exceed 5000 characters"],
    },
  },
  { timestamps: true },
);

const supportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Ticket owner is required"],
    },
    subject: {
      type: String,
      required: [true, "Ticket subject is required"],
      trim: true,
      maxlength: [160, "Subject cannot exceed 160 characters"],
    },
    category: {
      type: String,
      enum: [
        "Order Issue",
        "Payment Issue",
        "Delivery Issue",
        "Product Issue",
        "Account Issue",
        "Technical Issue",
        "Other",
      ],
      required: [true, "Ticket category is required"],
    },
    message: {
      type: String,
      required: [true, "Ticket message is required"],
      trim: true,
      maxlength: [5000, "Ticket message cannot exceed 5000 characters"],
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    replies: [replySchema],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      default: null,
    },
  },
  { timestamps: true, collection: "support_tickets" },
);

supportSchema.index({ user: 1, updatedAt: -1 });
supportSchema.index({ status: 1, category: 1, priority: 1, updatedAt: -1 });

const SupportModel = mongoose.model("SupportModel", supportSchema);

export default SupportModel;
