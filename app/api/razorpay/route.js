// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import connectDb from "@/db/connectDb";
// import User from "@/models/User";
// import PaymentSuccess from "@/app/paymentsuccess/page";

// export const POST = async (req) => {
//   await connectDb();
//   let body = await req.formData();
//   body = Object.fromEntries(body);

//   let p = await Payment.findOne({ oid: body.razorpay_order_id });

//   if (!p) {
//     return NextResponse.json({ success: false, message: "Order ID not found" });
//   }

//   let user = await User.findOne({ username: p.to_user });

//   let isValid = validatePaymentVerification(
//     {
//       order_id: body.razorpay_order_id,
//       payment_id: body.razorpay_payment_id,
//     },
//     body.razorpay_signature,
//     process.env.KEY_SECRET
//   );

//   if (isValid) {
//     await Payment.findOneAndUpdate(
//       { oid: body.razorpay_order_id },
//       { done: true },
//       { new: true }
//     );
//     return NextResponse.redirect(
//       `${process.env.NEXT_PUBLIC_URL}/paymentsuccess`
//     );
//   } else {
//     return NextResponse.json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };

import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { verifyPaymentSignature } from "@/utils/paymentVerification"; // (Optional) Custom utility for signature verification

export const POST = async (req) => {
  await connectDb(); // Connect to the database

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

    // Use a custom verification function or Razorpay's built-in utility (consider security implications)
    const isValid = verifyPaymentSignature
      ? await verifyPaymentSignature(bodyObject, process.env.KEY_SECRET)
      : validatePaymentVerification(
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
        { new: true } // Return the updated document
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
