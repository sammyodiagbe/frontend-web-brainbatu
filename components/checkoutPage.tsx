"use client"
import { PaymentElement,Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "./ui/button";
import { confirmPayment } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

type TCheckout = {
    clientSecret: string | null,
}




const CheckoutPage: FC<TCheckout> = ({ clientSecret}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [makingPayment, setMakingPayment] = useState(false)





    const { mutate: processPayment, isPending: processingPayment, error: paymentProcessError } = useMutation({
        mutationKey: ["confirmPayment"],
        mutationFn: async (data: FormData) => {
            setMakingPayment(true)
            try {

                if(!elements || !stripe) return;
                await elements?.submit();

    
                // so what i can do here is make a call to the backend and confirm the payment
                const { error } = await stripe?.confirmPayment({
                    elements,
                    clientSecret: clientSecret!,
                    confirmParams: {
                        return_url: "http://localhost:3000"
                    }

                })
                setMakingPayment(false)
            }catch(error: any) {
                console.log(error?.message)
                setMakingPayment(false)
            }
        },
    })
    

    if(!stripe || !elements) return;


    return <form action={processPayment} className="bg-white p-4 rounded-md">
    {clientSecret &&<PaymentElement id="payment-element"  />}
    <Button type="submit" disabled={makingPayment} className="w-full mt-4">Finish Payment</Button>
    </form>
        
}

export default CheckoutPage;