"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let order = await instance.orders.create(options);

  // Destructure name and message from paymentform
  const { name, message, contact } = paymentform;

  await Payment.create({
    oid: order.id,
    amount: amount / 100,
    to_user: to_username,
    name: Array.isArray(name) ? name.join(", ") : name,
    message: Array.isArray(message) ? message.join(", ") : message,
    contact,
  });

  return order;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ createdAt: -1 })
    .lean();
  return p;
};

export const updateProfile = async (ndata, oldusername) => {
  try {
    await connectDb();

    // Check if username is changing
    if (oldusername !== ndata.username) {
      let u = await User.findOne({ username: ndata.username });
      if (u) {
        return { ok: false, error: "Username already exists" };
      }
      await User.updateOne({ email: ndata.email }, ndata);
      await Payment.updateMany(
        { to_user: oldusername },
        { to_user: ndata.username }
      );
    } else {
      await User.updateOne({ email: ndata.email }, ndata);
    }

    return { ok: true };
  } catch (error) {
    console.error("Update error:", error);
    return { ok: false, error: error.message };
  }
};
