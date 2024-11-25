"use client"
import { confirmPayment, createPaymentIntent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/userContextProvider";
import {  loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Elements , useElements} from "@stripe/react-stripe-js";
import CheckoutPage from "@/components/checkoutPage";


const loadstripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const DepositPage = () => {
    const [secretKey, setSecretKey] = useState<string | null>(null);
    const [amount, setAmount] = useState("0");
    const { authUser } = useUserContext();

    const { data, mutate, isPending, error } = useMutation({
        mutationKey: ["paymentIntent"],
        mutationFn: () => createPaymentIntent({ data: { amount: parseInt(amount), stripe_customer_id: authUser.stripe_customer_id}}),
        onSettled(data, error, variables, context) {
            setSecretKey(data?.clientSecret!)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    
       return <Elements stripe={loadstripe}>
     <main className="h-screen w-screen flex flex-col items-center justify-center">

        <div className="space-y-4">
            {authUser?.email_address}
        <p>{data?.clientSecret}</p>
        <Input placeholder="Enter deposit amount" type="string"   value={amount} onChange={({ target}) => setAmount(target.value)}/>
        <Button disabled={isPending} onClick={() => mutate()}>Deposit ${amount}</Button>
        </div>
            <CheckoutPage clientSecret={secretKey} />
    </main>
         </Elements>
}

export default DepositPage;