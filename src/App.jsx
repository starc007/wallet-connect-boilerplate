import React, { useRef, useState } from "react";
import { useEffect } from "react";
import ConnectModal from "./components/ConnectModal";
import SwitchNetwork from "./components/SwitchNetwork";
import { useAuth } from "./context/auth";
import { ethers } from "@saura3h/web3-connect";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inpRef = useRef(null);
  const {
    user,
    error,
    disconnect,
    networkChange,
    accountChange,
    signMessage,
    connect,
  } = useAuth();

  useEffect(() => {
    async function connectWallet() {
      const pr = localStorage.getItem("walletPr");
      if (pr != null) {
        console.log("Connecting wallet...");
        await connect(pr);
      }
    }
    connectWallet();
  }, []);

  useEffect(() => {
    networkChange();
    accountChange();
  });

  const handleSign = async () => {
    if (inpRef.current) {
      const message = inpRef.current.value;
      // console.log(message);
      const _sign = await signMessage(message);
      console.log(_sign);
      if (_sign) {
        alert("Message signed successfully!");
      }
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-4xl font-bold text-center">
        Connect Wallet Boilerplate
      </h1>
      <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex justify-center mt-5">
        {user?.address != null ? (
          <button
            onClick={async () => await disconnect()}
            className="px-4 py-2 bg-gray-300 text-gray-900 font-semibold rounded"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-gray-900 text-gray-100 font-semibold rounded"
          >
            Connect
          </button>
        )}
      </div>
      {error != null && (
        <p className="text-center mt-4 text-lg font-medium text-red-600">
          {error}
        </p>
      )}
      {user?.address != null && (
        <>
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="font-semibold text-lg">
              Wallet Address : {user.address}
            </p>
            <p className="font-semibold text-lg mt-3">
              Chain Id : {user.chainId}
            </p>
          </div>
          <SwitchNetwork />
          <div className="flex justify-center mt-5 space-x-3">
            <input
              type="text"
              placeholder="Enter Message"
              className="border px-4 py-3 w-44 focus:outline-none"
              ref={inpRef}
            />
            <button
              onClick={handleSign}
              className="px-4 py-2 bg-gray-900 text-gray-100 font-semibold rounded "
            >
              Sign Message
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
