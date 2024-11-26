"use client"
import { addCard } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { CardCvcElement,CardExpiryElement, CardNumberElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useMutation } from "@tanstack/react-query";


const AddCardComponent =() => {
    const { authUser } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();

    const { mutate: createPaymentMethod, isPending} = useMutation({
        mutationFn: async (data: FormData) => {
            const stripe_customer_id = data.get("stripe_customer_id");
            if(!stripe || !elements) return;

            await elements.submit()

    

            // generate one time token to safely transfer data to the backend
            const token = await stripe.createConfirmationToken({
                elements,
                
            });
            

            const createCard = await addCard({ token, stripe_customer_id: authUser?.stripe_customer_id});
            // const create = await stripe.createPaymentMethod({
            //     elements: ,
            // })

          
        },
        mutationKey: ['createPayementMethod']
    })
    return <form className="space-y-4" action={createPaymentMethod}>
        <input type="hidden" name="stripe_customer_id" value={authUser?.stripe_customer_id} />
    <PaymentElement/>
<Button disabled={isPending} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 w-full">Add Payment Method</Button>
</form>
}


export default AddCardComponent;