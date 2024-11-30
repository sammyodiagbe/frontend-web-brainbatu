"use client"
import { addCard, attachPaymentMethod, getClientSecret } from "@/app/actions";
import { FC, use } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { CardCvcElement,CardExpiryElement, CardNumberElement, useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js"
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

interface Ttype {
    clientSecret: string,
}


const AddCardComponent: FC<Ttype> =({ clientSecret}) => {
    const { authUser } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();

    const { mutate: createPaymentMethod, isPending} = useMutation({
        mutationFn: async (data: FormData) => {
            console.log('checking')
            if(!stripe || !elements) return;

            const { error } = await elements.submit()
            if(error) {
                console.log(error)
                return;
            }

            const CardElement = elements.getElement("card");

            if(!CardElement) return;

            const cardToken = await stripe.createToken(CardElement, {
                currency: "cad"
            });
            if(!cardToken) return;

            const check = await attachPaymentMethod({ stripe_customer_id: authUser?.stripe_customer_id, token_id: cardToken.token?.id as string})

            console.log(check)

            console.log(cardToken)

          
        },
        mutationKey: ['createPayementMethod']
    })

    
   return  <form className="space-y-4" action={createPaymentMethod}>
    {"Checking to see what happens"}
    <CardElement options={{}}/>
<Button disabled={isPending} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 w-full">Add Payment Method</Button>
</form>
}


export default AddCardComponent;