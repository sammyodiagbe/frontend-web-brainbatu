"use client"
import { addCard, getClientSecret } from "@/app/actions";
import { FC, use } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { CardCvcElement,CardExpiryElement, CardNumberElement, useStripe, useElements, PaymentElement, CardElement } from "@stripe/react-stripe-js"
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useState } from "react";



const AddCardComponent =() => {
    const { authUser } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();

    const { mutate: createPaymentMethod, isPending} = useMutation({
        mutationFn: async (data: FormData) => {
            console.log('checking')
            const stripe_customer_id = data.get("stripe_customer_id");
            if(!stripe || !elements) return;

            await elements.submit()

    
            const create = await stripe.createPaymentMethod({
                elements,
                
            })

            console.log("Created data")
            console.log(create.paymentMethod)
            // const create = await stripe.createPaymentMethod({
            //     elements: ,
            // })

          
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