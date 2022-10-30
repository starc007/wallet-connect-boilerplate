import { createContext, useContext, useState } from "react";
import { useMetamask, useWalletConnect } from "@saura3h/web3-connect";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const rpcUrl = {
  1: "https://rpc.ankr.com/eth",
  56: "https://rpc.ankr.com/bsc",
  137: "https://rpc.ankr.com/polygon",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    address: null,
    chainId: null,
    client: null,
  });
  const [error, setError] = useState(null);

  const connectMetaMask = async () => {
    const _client = new useMetamask();
    const _wallet = await _client._connectMM();
    if (_wallet.success) {
      localStorage.setItem("walletPr", "metamask");
      setUser({
        address: _wallet.address,
        chainId: _wallet.chainId,
        client: _client,
      });
      setError(null);
    } else {
      setUser({ address: null, chainId: null });
      setError(_wallet.message);
    }
  };

  const connectWalletConnect = async () => {
    const _client = new useWalletConnect({ rpc: rpcUrl });
    const _wallet = await _client._connectWC();
    if (_wallet.success) {
      localStorage.setItem("walletPr", "walletconnect");
      setUser({
        address: _wallet.address,
        chainId: _wallet.chainId,
        client: _client,
      });
      setError(null);
    } else {
      setUser({ address: null, chainId: null, client: null });
      setError(_wallet.message);
    }
  };

  const connect = async (provider) => {
    switch (provider) {
      case "metamask":
        await connectMetaMask();
        break;
      case "walletconnect":
        await connectWalletConnect();
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setUser({ address: null, chainId: null, client: null });
    localStorage.removeItem("walletPr");
    setError(null);
  };

  const disconnect = async () => {
    const provider = localStorage.getItem("walletPr");
    if (user.client == null) {
      reset();
      return;
    }
    console.log("Disconnecting walletconnect...");
    if (provider == "walletconnect") {
      await user.client._disconnectWC();
      reset();
    } else {
      user.client.removeListeners();
      reset();
    }
  };

  const switchNetwork = async (chainId) => {
    if (user.client != null) {
      console.log("Switching network...");
      const _switch = await user.client._switchNetwork(chainId);
      if (_switch.success) {
        setUser({ ...user, chainId });
        setError(null);
      } else {
        setError(_switch.message);
      }
    }
  };

  const networkChange = async () => {
    if (user.client != null) {
      user.client.onNetworkChange((chainId) => {
        setUser({ ...user, chainId: parseInt(chainId) });
      });
    }
  };

  const accountChange = async () => {
    if (user.client != null) {
      user.client.onAccountChange((address) => {
        setUser({ ...user, address });
      });
    }
  };

  const signMessage = async (message) => {
    if (user.client != null) {
      const _sign = await user.client._signMessage(message);
      if (_sign.success) {
        setError(null);
        return _sign;
      } else {
        setError(_sign.message);
        return _sign;
      }
    }
  };

  const value = {
    user,
    connect,
    error,
    disconnect,
    switchNetwork,
    networkChange,
    accountChange,
    signMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
