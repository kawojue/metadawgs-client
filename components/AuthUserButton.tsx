"use client";

import { Button } from "@/components/ui/button";
import { authWithTwitter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";

function AuthUserButton() {
  const { userToken, userProfile } = useAuth();

  function authWithX() {
    authWithTwitter();
  }

  return (
    <>
      {!userToken && (
        <Button
          className="bg-[white] text-black shadow-[#484848] rounded-full px-5! py-6! text-sm cursor-pointer hover:bg-[white]/80!"
          onClick={authWithX}
        >
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.49204 7.76733L9.6665 12H14.3332L9.0943 5.01487L13.4537 0H11.687L8.27604 3.92385L5.33317 0H0.666504L5.67374 6.67633L1.04594 12H2.81262L6.49204 7.76733ZM10.3332 10.6667L3.33317 1.33333H4.6665L11.6665 10.6667H10.3332Z"
              fill="black"
            />
          </svg>
          <span>Continue with X</span>
        </Button>
      )}
      {!!userToken && (
        <Button
          className=" px-5! pl-3! py-6!  bg-[white] text-black shadow-[#484848] rounded-full text-sm cursor-pointer hover:bg-[white]/80!"

          //   onClick={() => setProfileIsOpen(true)}
        >
          <Avatar className="w-8 h-8 min-w-8 min-h-8" suppressHydrationWarning>
            <AvatarImage src={userProfile?.user.avatar} />
            <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500"></AvatarFallback>
          </Avatar>
          <span className="text-sm line-clamp-1">
            {userProfile?.user.username}
          </span>
        </Button>
      )}
    </>
  );
}

export default AuthUserButton;
