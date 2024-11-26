"use client"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/userContextProvider"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { withDrawFunds } from "../actions"
import {  Elements,  } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import AddCardComponent from "@/components/addCardComponent"

const loadstripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const WithdrawPage = () => {
    const { authUser } = useUserContext()

    // const { mutate: generateClientSecret } = useMutation({
    //     mutationFn: () => {},
    //     mutationKey: ["generateClientSecret"]
    // })
    

    const { mutate: withdraw, isPending} = useMutation({
        mutationFn: (data: FormData) => withDrawFunds(data),
        mutationKey: ['withdrawFunds'],
        onError: (message) => {
            console.log(message)
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })

    return <div className="">
        <h1>Withdraw your winnnings</h1>
        <form action={withdraw}>
            <input type="hidden" name="stripe_customer_id" value={authUser?.stripe_customer_id}  />
            <input type="number" value={50} name="amount" placeholder="Enter amount to withdraw" readOnly/>
            < Button className="" type="submit">Withdraw</Button>
        </form>
        <div className="bg-white max-w-[500px] p-4">
            <h1 className="text-gray-700 mb-4">Add payment method</h1>
            <Elements options={{ mode: "setup", currency: "cad"}} stripe={loadstripe}>
                <AddCardComponent />
            </Elements>
        </div>
    </div>
}

export default WithdrawPage;