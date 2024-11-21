"use server";
import { linkAccountType } from "@/utils/types";
import { url } from "@/utils/variables";
import axios from "axios";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const createConnectAccount = async (data: FormData) => {
  console.log("createConnectAccount");
  const email_address = data.get("email_address");
  const userId = data.get("userId");
  try {
    const response = await axios.post(`${url}/stripe/connect/account/create`, {
      email_address,
      userId,
    });

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error?.message);
    return;
  }
};

export const linkConnectAccount = async (data: linkAccountType) => {
  const { accountId } = data;
  try {
    const response = await axios.post(`${url}/stripe/connect/account/link`, {
      accountId,
    });
    redirect(response.data.url);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createPaymentIntent = async ({
  data,
}: {
  data: { amount: number; stripe_customer_id: string };
}) => {
  const headersList = await headers();
  const url = headersList.get("origin");
  const { amount, stripe_customer_id } = data;
  try {
    const response = await axios.post(`${url}/stripe/create-payment-intent`, {
      amount,
      stripe_customer_id,
    });
    redirect(`${url}/payment?payment_intent_id=${response.data.id}`);
  } catch (error) {
    console.log(error);
    return;
  }
};
