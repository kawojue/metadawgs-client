"use client";

import { useEffect, useRef } from "react";
import { WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { hashAddress } from "@/lib/common";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import useLocalStorage from "use-local-storage";
// import { postWithAuth } from "@/lib/api";
import useAuth from "@/hooks/use-auth";
import useMobileMenu from "@/hooks/use-mobile-menu";

const LAST_SYNCED_WALLET_KEY = "last_synced_wallet"; // new key for localstorage

function AddressButton() {
  const { userToken } = useAuth();
  const { setMenuIsOpen } = useMobileMenu();

  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const [lastSyncedWallet, setLastSyncedWallet] = useLocalStorage<
    string | null
  >(LAST_SYNCED_WALLET_KEY, null);

  const lastSyncedWalletRef = useRef(lastSyncedWallet);

  function connectWallet() {
    setMenuIsOpen(false);
    // if (!userToken) {
    //   setOpenSignUpAlert(true);
    //   return;
    // }
    setVisible(true);
  }

  function disconnectWallet() {
    setMenuIsOpen(false);
    disconnect();
  }

  useEffect(() => {
    async function updateUserWallet() {
      if (!publicKey || !userToken) return;

      const currentWallet = publicKey.toBase58();

      if (lastSyncedWalletRef.current === currentWallet) {
        return;
      }

      setLastSyncedWallet(currentWallet);
      lastSyncedWalletRef.current = currentWallet;

      // try {
      //   await postWithAuth("/user/link-wallet", {
      //     walletAddress: currentWallet,
      //   });
      //   setLastSyncedWallet(currentWallet);
      //   lastSyncedWalletRef.current = currentWallet;
      // } catch (error) {
      //   console.error("Failed to link wallet:", error);
      // }
    }

    updateUserWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, userToken]);

  return (
    <>
      {!publicKey ? (
        <Button
          className="bg-[#FFBE00] text-black rounded-full px-6! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
          onClick={connectWallet}
        >
          <WalletIcon size={12} />
          <span>Connect wallet</span>
        </Button>
      ) : (
        <Button
          className="bg-[#FFBE00] text-black rounded-full px-3! py-6! cursor-pointer hover:bg-[#FFBE00]/80!"
          onClick={disconnectWallet}
        >
          <Avatar className="w-8 h-8 min-w-8 min-h-8">
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500" />
          </Avatar>
          <span>{hashAddress(publicKey.toBase58())}</span>
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00004 13.6666C3.31814 13.6666 0.333374 10.6818 0.333374 6.99992C0.333374 3.31802 3.31814 0.333252 7.00004 0.333252C9.18091 0.333252 11.1172 1.38044 12.3335 2.99941L10.5273 2.99946C9.58718 2.16991 8.35238 1.66659 7.00004 1.66659C4.05452 1.66659 1.66671 4.0544 1.66671 6.99992C1.66671 9.94545 4.05452 12.3333 7.00004 12.3333C8.35271 12.3333 9.58778 11.8297 10.528 10.9998H12.334C11.1177 12.6191 9.18118 13.6666 7.00004 13.6666ZM11.6667 9.66658V7.66658H6.33338V6.33325H11.6667V4.33325L15 6.99992L11.6667 9.66658Z"
              fill="#FF0000"
            />
          </svg>
        </Button>
      )}
    </>
  );
}

export default AddressButton;
