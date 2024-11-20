"use server";
import { accountType, linkAccountType } from "@/utils/types";
import { url } from "@/utils/variables";
import axios from "axios";

export const createConnectAccount = async (data: accountType) => {
  const { email_address, userId } = data;
  try {
    const response = await axios.post(`${url}/stripe/connect/account/create`, {
      email_address,
      userId,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const linkConnectAccount = async (data: linkAccountType) => {
  const { accountId } = data;
  try {
    const response = await axios.post(`${url}/stripe/connect/account/link`, {
      accountId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
