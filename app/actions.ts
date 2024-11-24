"use server";
import { linkAccountType } from "@/utils/types";
import { url } from "@/utils/variables";
import axios from "axios";
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
}): Promise<{ clientSecret: string} | null> => {
  console.log('check')
  const headersList = await headers();
  const { amount, stripe_customer_id } = data;
  try {
    const response = await axios.post(`http://localhost:8000/stripe/create-payment-intent`, {
      amount: Math.round(amount * 100),
      stripe_customer_id,
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log('There was an error ')
    console.log(error?.message);
    return null;
  }
};

export const confirmPayment = async (data: FormData) => {
  console.log(data)
  try {
    const confirm = await axios.post("");
    return null;
  }catch(error: any) {
    console.log(error?.message)
  }
  return;
}
