import Stripe from "stripe";
import { NextResponse } from "next/server";
import connectDB from "@/config/config";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  try {
    await connectDB();

    const { orderId } = await req.json();

    const data = await Order
      .findById(orderId)
      .populate("user")
      .populate("product");

    if (!data) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Calculate amount safely
    const amount = Number(data.product.price) * Number(data.count || 1);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Order #${orderId}`,
            },
            unit_amount: amount * 100, // paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/user/ordercheckout?action=success&id=${orderId}`,
      cancel_url: `${req.headers.get("origin")}/user/ordercheckout?action=failed`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
};