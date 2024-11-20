"use client";
import { createConnectAccount, linkConnectAccount } from "../actions";

const WalletPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>Wallet page</h1>
      <p>
        Connect your wallet to verify your account and continue to the
        application.
      </p>
      <h1 className="text-md font-bold">acct_1QN3spFtK3vHTqJl</h1>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={async () => {
            const res = await createConnectAccount({
              email_address: "odiagbesamsonosaro@gmail.com",
              userId: "12355",
            });

            console.log(res);
          }}
          className="text-sm bg-gray-700 hover:bg-gray-800 text-white p-1 py-2 px-4 rounded-md"
        >
          Verify Connect
        </button>
        <button
          onClick={async () => {
            const res = await linkConnectAccount({
              accountId: "acct_1QNFFJC2lM2qF6cl",
            });

            console.log(res);
          }}
          className="text-sm bg-gray-200 hover:bg-gray-300 p-1 py-2 px-4 rounded-md"
        >
          Link account
        </button>
      </div>
    </div>
  );
};

export default WalletPage;
