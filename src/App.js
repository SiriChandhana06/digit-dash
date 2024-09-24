import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainName, setChainName] = useState(null);
  const [showDisconnect, setShowDisconnect] = useState(false); 
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found");
      const res = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        "Connected to Solana with public key",
        res.publicKey.toString()
      );
      setWalletAddress(res.publicKey.toString());
      setChainName("Solana"); 
    } else {
      alert("Solana object not found, install Phantom wallet");
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setChainName("Solana"); 
    }
  };

  const disconnectWallet = () => {
    console.log("Disconnected wallet");
    setWalletAddress(null);
    setChainName(null);
    setShowDisconnect(false); 
  };

  const toggleDisconnect = () => {
    setShowDisconnect(!showDisconnect);
  };

  const showConnectButton = () => {
    return (
      <button
        className="text-white font-bold h-10 px-10 rounded-md  connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to wallet
      </button>
    );
  };

  useEffect(() => {
    const onload = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onload);

    return () => window.removeEventListener("load", onload);
  }, []);

  return (
    <div className="bg-[#1a202c] text-center h-screen">
      <div className="container">
        <div className="header-container">
          {!walletAddress && showConnectButton()}
          {walletAddress && (
            <div className="flex gap-4">
                <button
                className=" text-white font-bold h-10 px-10 rounded-md  connect-wallet-button"
                onClick={toggleDisconnect} 
              >
                {chainName}
                </button>
              <button
                className=" text-white font-bold h-10 px-10 rounded-md  connect-wallet-button"
                onClick={toggleDisconnect} 
              >
               {walletAddress}
              </button>

              {showDisconnect && (
                <div className="absolute right-0 mt-2 w-48  rounded-md shadow-lg py-2 z-10"> 
                  <button
                    className="text-black bg-white font-bold py-2 px-4 rounded"
                    onClick={disconnectWallet} 
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
