"use client"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/userContextProvider"
import { useMutation } from "@tanstack/react-query"
import { getClientSecret, withDrawFunds } from "../actions"
import {  Elements,  } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import AddCardComponent from "@/components/addCardComponent"
import { useState } from "react"

const loadstripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const WithdrawPage = () => {
    const { authUser } = useUserContext()
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    // const { mutate: generateClientSecret } = useMutation({
    //     mutationFn: () => {},
    //     mutationKey: ["generateClientSecret"]
    // })
    const { mutate: generateClientSecret, isPending: generatingClientSecret, data } = useMutation({
        mutationKey: ["generateClientSecret"],
        mutationFn: async () => {
            setClientSecret(null)
            const clientSecret = await getClientSecret(authUser?.stripe_customer_id);;
            console.log(clientSecret)
            return clientSecret;
        },
        onSuccess: (data) => {
            console.log("data, ", data)
            setClientSecret(data?.clientSecret!)
        },
        onSettled: (data) => {
            console.log("data, ", data)

            setClientSecret(data?.clientSecret!)
        }

    })
    

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
        {data?.clientSecret}
        <form action={withdraw}>
            <input type="hidden" name="stripe_customer_id" value={authUser?.stripe_customer_id}  />
            <input type="number" value={50} name="amount" placeholder="Enter amount to withdraw" readOnly/>
            < Button className="" type="submit">Withdrawal</Button>
        </form>
        <div className="bg-white max-w-[500px] p-4">
            <h1 className="text-gray-700 mb-4">Add payment method</h1>
           { data?.clientSecret ? <Elements  options={{ clientSecret: data?.clientSecret, }} stripe={loadstripe}>
                <AddCardComponent clientSecret={data?.clientSecret}/>
            </Elements> : <Button className="p-4 text-white bg-blue-500 hover:bg-blue-600" onClick={() =>  generateClientSecret()}>Add New Card</Button>}
        </div>
    </div>
}

export default WithdrawPage;