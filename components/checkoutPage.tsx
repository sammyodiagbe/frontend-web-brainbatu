"use client"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "./ui/button";
import { confirmPayment } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

type TCheckout = {
    clientSecret: string | null,
}

const CheckoutPage: FC<TCheckout> = ({ clientSecret}) => {
    const stripe = useStripe();
    const elements = useElements();



    const { mutate: processPayment, isPending: processingPayment, error: paymentProcessError } = useMutation({
        mutationKey: ["confirmPayment"],
        mutationFn: (data: FormData) => confirmPayment(data),
    })


    return <form action={processPayment}>
    {clientSecret &&<PaymentElement id="payment-element" options={{
        layout: "tabs"
    }}/>}
    <Button type="submit">Finish Payment</Button>
    </form>
}

export default CheckoutPage;