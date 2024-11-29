"use client"
import { addCard, attachPaymentMethod, getClientSecret } from "@/app/actions";
import { FC, use } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { CardCvcElement,CardExpiryElement, CardNumberElement, useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js"
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useState } from "react";

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

            const { setupIntent } = await stripe?.confirmSetup({
                elements,
                clientSecret: clientSecret!,
                redirect: "if_required",
                confirmParams: {
                    return_url: "http://localhost:3000",
                    payment_method: "card", 
                }
            });
            if(!setupIntent) return;

            
            const attach = await attachPaymentMethod({ stripe_customer_id: authUser?.stripe_customer_id as string, payment_id: setupIntent?.payment_method as string})

          
        },
        mutationKey: ['createPayementMethod']
    })

    
   return  <form className="space-y-4" action={createPaymentMethod}>
    {"Checking to see what happens"}
    <PaymentElement options={{}}/>
<Button disabled={isPending} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 w-full">Add Payment Method</Button>
</form>
}


export default AddCardComponent;