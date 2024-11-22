"use client";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContextProvider";
import { SignedIn } from "@clerk/nextjs";
import { createConnectAccount } from "./actions";

export default function Home() {
  const { authUser } = useUserContext();

  const handleSubmit = async (data: FormData) => {
    const { redirectTo } = await createConnectAccount(data);
    window.location.href = redirectTo;
  };

  return (
    <div className="grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the future</h1>
        <p className="max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quo
          maxime, quia blanditiis laborum eius saepe sed modi ipsum quis aut
          eligendi! Labore soluta doloremque rerum optio fugiat ex magnam?ß
        </p>
      </div>
      <div>
        <p>hi, {authUser?.first_name}</p>

        <form action={handleSubmit}>
          <input
            type="hidden"
            name="email_address"
            value={authUser?.email_address}
          />
          <input type="hidden" name="userId" value={authUser?.id} />
          
        </form>


        <SignedIn>
          {/* <Button
            onClick={() =>
              createPaymentIntent({
                data: {
                  amount: 100,
                  stripe_customer_id: authUser?.stripe_customer_id,
                },
              })
            }
          >
            Add funds
          </Button> */}
        </SignedIn>
      </div>
    </div>
  );
}
