"use client"
import { PaymentElement,Elements, useElements, useStripe } from "@stripe/react-stripe-js"
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
            try {

                const elem = await elements?.submit();
    
                console.log("elements have been submitted")
                console.log(elem)
            }catch(error: any) {
                console.log(error?.message)
            }
        },
    })
    

    if(!stripe || !elements) return;


    return <form action={processPayment} className="bg-white p-4 rounded-md">
    {clientSecret &&<PaymentElement id="payment-element"  />}
    <Button type="submit" className="w-full mt-4">Finish Payment</Button>
    </form>
        
}

export default CheckoutPage;