"use client"
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { CardCvcElement,CardExpiryElement, CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useMutation } from "@tanstack/react-query";


const AddCardComponent =() => {
    const { authUser } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();

    const { mutate: createPaymentMethod, isPending} = useMutation({
        mutationFn: async (data: FormData) => {
            const stripe_customer_id = data.get("stripe_customer_id");
            if(!stripe || !elements) return;

            const { error, selectedPaymentMethod } =  await elements.submit();

            
            if(error)  return;
            console.log(selectedPaymentMethod)
        },
        mutationKey: ['createPayementMethod']
    })
    return <form className="space-y-4" action={createPaymentMethod}>
        <input type="hidden" name="stripe_customer_id" value={authUser.stripe_customer_id} />
    <CardNumberElement className="p-4 bg-gray-100 border-solid rounded-2" options={{showIcon: true}}/>
    <CardCvcElement className="p-4 bg-gray-100 border-solid rounded-2" options={{ }} />
    
    <CardExpiryElement className="p-4 bg-gray-100 border-solid rounded-2" />
<Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 w-full">Add Payment Method</Button>
</form>
}