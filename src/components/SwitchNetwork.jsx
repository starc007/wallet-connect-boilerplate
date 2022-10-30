import React from "react";
import { useAuth } from "../context/auth";
const networkname = [
  {
    title: "ETH Mainnet",
    chainId: 1,
  },
  {
    title: "BNB Mainnet",
    chainId: 56,
  },
  {
    title: "Polygon Mainnet",
    chainId: 137,
  },
];
const SwitchNetwork = () => {
  const { switchNetwork } = useAuth();

  const handleSwitch = async (chainId) => {
    await switchNetwork(chainId);
  };

  return (
    <div className="flex justify-center space-x-2 mt-5">
      {networkname.map((network) => (
        <button
          key={network.chainId}
          onClick={() => handleSwitch(network.chainId)}
          className="px-3 py-2 bg-gray-200 text-gray-900 rounded text-sm font-semibold"
        >
          Switch to {network.title}
        </button>
      ))}
    </div>
  );
};

export default SwitchNetwork;
