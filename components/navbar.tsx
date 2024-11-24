"use client";
import { useUserContext } from "@/context/userContextProvider";
import { SignedIn } from "@clerk/nextjs";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { IoExitOutline, IoAddCircleSharp } from "react-icons/io5";
import CreateAccountComponent from "./createAccountComponent";
import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "@/app/actions";



const Navbar = () => {

    const { authUser} = useUserContext();

    // const { mutate} = useMutation({
    //     queryId: ,
    //     queryFn: () => createPaymentIntent({})
    // })
  return  (<>
  {<CreateAccountComponent />  }
  <nav className="dark:bg-gray-900 dark:text-white flex justify-between p-4 items-center bg-gray-100">
    <h1 className="font-bold">Brainbatu</h1>

    <div className="flex items-center gap-4">
        <SignedIn>
            <span className="font-bold">Balance: ${authUser?.balance}</span>
            <Button variant="outline" className="text-xs py-2 rounded-sm bg-gray-200 hover:bg-gray-300"><IoAddCircleSharp />Add funds</Button>
            <SignOutButton>
                <IoExitOutline className="text-xl cursor-pointer" />
            </SignOutButton>
            <UserButton />
        </SignedIn>
    </div>
  </nav></>)
};

export default Navbar;
