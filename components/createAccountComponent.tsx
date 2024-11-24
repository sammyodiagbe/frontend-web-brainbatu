
"use client"
import { createConnectAccount, linkConnectAccount } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const CreateAccountComponent = () => {
    const { authUser} = useUserContext();
    const router = useRouter();

    const { mutate, error, isPending} = useMutation({
        mutationKey: ["createConnectAccount"],
        mutationFn: () => createConnectAccount({
            email_address: authUser?.email_address,
            userId: authUser?.id    
        }),
    })

    

    const { mutate: linkAccount, error: linkError, isPending: linkIsPending} = useMutation({
        mutationKey: ["linkConnectAccount"],
        mutationFn: () => linkConnectAccount({
            accountId: authUser?.stripe_customer_id,
        }),
        onSuccess(data, variables, context) {
            if(data){
                router.push(data);
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    })

    if(!authUser){
        return null;
    }

    if(!authUser?.stripe_customer_id){
        return <div className="bg-yellow-200 flex justify-between gap-4 p-4 items-center">
            <p className="text-sm text-gray-800">Your account is not connected to a bank account, to make the best of Brainbatu and be able to withdraw your earnings, please connect your bank account.</p>
            <Button onClick={() => mutate()} disabled={isPending} className="bg-green-500 hover:bg-green-600 text-white">Connect bank account</Button>
        </div>
    }

    if(!authUser?.details_submitted){
        return <div className="bg-yellow-200 flex justify-between gap-4 p-4 items-center">
            <p className="text-sm text-gray-800">Please complete your account verification to be able to withdraw your earnings.</p>
            <Button onClick={() => linkAccount()} disabled={linkIsPending} className="bg-green-500 hover:bg-green-600 text-white">Start verification</Button>
        </div>
    }

    if(!authUser?.payouts_enabled || !authUser?.charges_enabled){
        return <div className="bg-yellow-200 flex justify-between gap-4 p-4 items-center">
            <p className="text-sm text-gray-800">Your account verification is not complete, to make the best of Brainbatu and be able to withdraw your earnings, please connect your bank account.</p>
            <Button onClick={() => linkAccount()} disabled={linkIsPending} className="bg-green-500 hover:bg-green-600 text-white">Complete verification</Button>
        </div>
    }

  return null
};

export default CreateAccountComponent;
