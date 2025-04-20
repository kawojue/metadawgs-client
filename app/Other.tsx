"use client";

import { Button } from "@/components/ui/button";
import { XUserToken } from "@/lib/values";
import {
  CircleArrowOutUpLeftIcon,
  CircleArrowOutUpRightIcon,
} from "lucide-react";
import useLocalStorage from "use-local-storage";

function Other() {
  const [userToken, setUserToken] = useLocalStorage<string>(XUserToken, "");

  return (
    <div>
      <Button
        className="fixed right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={() => {
          if (!!userToken) {
            setUserToken("");
          } else {
            setUserToken("Token");
          }
        }}
      >
        {!userToken && <CircleArrowOutUpRightIcon size={45} />}
        {!!userToken && <CircleArrowOutUpLeftIcon size={45} />}
      </Button>
    </div>
  );
}

export default Other;
