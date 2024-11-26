"use client"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/userContextProvider"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { withDrawFunds } from "../actions"



const WithdrawPage = () => {
    const [withdrawing, setWithdrawing] = useState(false)
    const { authUser } = useUserContext()

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
    </div>
}

export default WithdrawPage;