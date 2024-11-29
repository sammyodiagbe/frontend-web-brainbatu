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

export const withDrawFunds = async (data: FormData) => {

  console.log(data)
  let amount = data.get("amount")
  const accountId = data.get("stripe_customer_id");
  if(!amount || !accountId) return;


  try {
    const withdraw = await axios.post( `${url}/stripe/connect/account/payout`, {
      stripe_customer_id: accountId,
      amount: amount
    });

    return withdraw.data;
  }catch(error: any) {
    console.log(error?.message)
  }
}

export const getClientSecret = async (id: string) : Promise<{ clientSecret: string} | null> => {
  try {
    const clientSecret = await axios.post(`${url}/stripe/get-client-secret`, { stripe_customer_id: id});
    return clientSecret.data;
  }catch(error: any) {
    console.log(error?.message)
    return null;
  }
}

export const addCard = async (data: any) =>  {
  try {
    const card = await axios.post(`${url}/stripe/connect/add-card`, {
      ...data
    });
    console.log(card)
  }catch(error: any) {
    console.log(error?.message)
  }
}

export const attachPaymentMethod = async ({stripe_customer_id, payment_id}: { stripe_customer_id: string, payment_id: string}) => {
  try {
      const attachPaymennt = await axios.post(`${url}/stripe/payments/attach`, {
          stripe_customer_id,
          payment_id
      });

      console.log(attachPaymennt)


  }catch(error: any) {
    console.log(error?.message)
  }
}


