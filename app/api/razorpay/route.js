import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDb();

  try {
    const body = await req.formData();
    const bodyObject = Object.fromEntries(body);

    const payment = await Payment.findOne({
      oid: bodyObject.razorpay_order_id,
    });

    if (!payment) {
      return NextResponse.json({
        success: false,
        message: "Order ID not found",
      });
    }

    const user = await User.findOne({ username: payment.to_user });

    const isValid = validatePaymentVerification(
      {
        order_id: bodyObject.razorpay_order_id,
        payment_id: bodyObject.razorpay_payment_id,
      },
      bodyObject.razorpay_signature,
      process.env.KEY_SECRET
    );

    if (isValid) {
      await Payment.findOneAndUpdate(
        { oid: bodyObject.razorpay_order_id },
        { done: true },
        { new: true }
      );

      // Ensure the URL is valid and accessible from the client (security best practice)
      const redirectUrl = new URL(
        "/paymentsuccess",
        process.env.NEXT_PUBLIC_URL
      );

      return NextResponse.redirect(redirectUrl.toString());
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    // Handle errors appropriately (e.g., log, return error response)
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};
