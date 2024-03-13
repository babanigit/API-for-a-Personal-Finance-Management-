import mongoose from "mongoose";

const transSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    TransactionName: {
      type: String,
      required: [true, "please add the contact name"],
    },
    income: {
      type: Number,
      required: [true, "please add the income number"],
    },
    expenses: {
      type: Number,
      required: [true, "please add the expenses number"],
    },

  },
  {
    timestamps: true,
  }
);

const monog = mongoose.model("DataTrans", transSchema);

export default monog;
