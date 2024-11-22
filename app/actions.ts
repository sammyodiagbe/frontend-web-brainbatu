"use server";
import { linkAccountType } from "@/utils/types";
import { url } from "@/utils/variables";
import axios from "axios";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const createConnectAccount = async (
  data: any
): Promise<{ redirectTo: string } | null> => {
  const { email_address, userId } = data;
  try {
    const response = await axios.post(`${url}/stripe/connect/account/create`, {
      email_address,
      userId,
    });

    const link = await linkConnectAccount({
      accountId: response.data.accountId,
    });
    return { redirectTo: link as unknown as string };
  } catch (error: any) {
    console.log(error?.message);
    return null;
  }
};

export const linkConnectAccount = async (data: linkAccountType): Promise<string | null> => {
  const { accountId } = data;
  try {
    const response = await axios.post(`${url}/stripe/connect/account/link`, {
      accountId,
    });

    console.log(response.data);
    return response.data.link.url;
  } catch (error: any) {
    console.log(error?.message);
    return null;
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
