"use client"
import { CardElement,Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "./ui/button";
import { confirmPayment } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { loadStripe } from "@stripe/stripe-js";

type TCheckout = {
    clientSecret: string | null,
}


const loadstripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


const CheckoutPage: FC<TCheckout> = ({ clientSecret}) => {
    const stripe = useStripe();
    const elements = useElements();





    const { mutate: processPayment, isPending: processingPayment, error: paymentProcessError } = useMutation({
        mutationKey: ["confirmPayment"],
        mutationFn: async (data: FormData) => {
            const elem = await elements?.submit();
            console.log(elem)
        },
    })
    

    if(!stripe || !elements) return;


    return <form action={processPayment}>
    {clientSecret &&<CardElement id="payment-element" />}
    <Button type="submit">Finish Payment</Button>
    </form>
        
}

export default CheckoutPage;