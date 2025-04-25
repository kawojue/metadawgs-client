"use client";

import UsersTable from "@/components/custom/tables/users_table";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";
import { formatNumberWithCommas } from "@/lib/common";
import { SearchIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Metrics = {
  totalPoints: string;
  totalUsers: number;
  totalPostEntries: number;
  totalEngaged: number;
  totalReferred: number;
};

const Page = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    async function getData() {
      const resMetrics = await fetchWithAuth<Metrics>("/stats", {
        isAdmin: true,
      });

      setMetrics(resMetrics.data);
    }

    getData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold font-fredoka">Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <div className="col space-y-4 p-5 py-5 rounded-2xl bg-[#000000] text-white w-full lg:max-w-[380px] max-w-[300px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0065 5.33716C24.1067 5.33716 30.6732 8.91888 30.6732 13.3371V18.6705C30.6732 23.0887 24.1067 26.6705 16.0065 26.6705C8.05099 26.6705 1.57486 23.2155 1.3461 18.9063L1.33984 18.6705V13.3371C1.33984 8.91888 7.90634 5.33716 16.0065 5.33716ZM16.0065 21.3371C11.0459 21.3371 6.6605 19.9938 4.00622 17.9378L4.00651 18.6705C4.00651 21.1801 9.18335 24.0038 16.0065 24.0038C22.6875 24.0038 27.7901 21.2965 27.9999 18.8277L28.0065 18.6705L28.0081 17.9367C25.354 19.9934 20.968 21.3371 16.0065 21.3371ZM16.0065 8.00382C9.18335 8.00382 4.00651 10.8276 4.00651 13.3371C4.00651 15.8467 9.18335 18.6705 16.0065 18.6705C22.8297 18.6705 28.0065 15.8467 28.0065 13.3371C28.0065 10.8276 22.8297 8.00382 16.0065 8.00382Z"
                fill="white"
              />
            </svg>

            <p className="text-sm">Total Point Accumulated</p>
            <span className="total font-extrabold text-3xl">
              {metrics?.totalPoints || 0}
            </span>
          </div>
          <div className="col space-y-4 p-5 py-5 rounded-2xl bg-[#F5F5F5] w-full lg:max-w-[380px] max-w-[300px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7333 15.3334C11.0764 15.3334 9.73329 13.9902 9.73329 12.3334C9.73329 10.6766 11.0764 9.33342 12.7333 9.33342C14.3901 9.33342 15.7333 10.6766 15.7333 12.3334C15.7333 13.9902 14.3901 15.3334 12.7333 15.3334ZM13.3333 26.3307V21.8667C13.3333 21.2155 13.5256 20.617 13.8721 20.0833C13.4782 20.0285 13.0757 20.0001 12.6666 20.0001C10.576 20.0001 8.65821 20.7403 7.16117 21.973C8.59875 24.0962 10.7812 25.6738 13.3333 26.3307ZM5.93711 19.5467C7.81905 18.1558 10.1468 17.3334 12.6666 17.3334C14.058 17.3334 15.3908 17.5841 16.6222 18.0429C17.7929 17.5851 19.1898 17.3334 20.6666 17.3334C22.8796 17.3334 24.9132 17.8986 26.2746 18.8751C26.5301 17.9605 26.6666 16.9962 26.6666 16.0001C26.6666 10.109 21.891 5.33341 16 5.33341C10.1089 5.33341 5.33329 10.109 5.33329 16.0001C5.33329 17.2434 5.54604 18.4371 5.93711 19.5467ZM25.1725 21.4479C24.6482 20.7369 22.8944 20.0001 20.6666 20.0001C17.9918 20.0001 16 21.0623 16 21.8667V26.6667C19.9006 26.6667 23.3124 24.5729 25.1725 21.4479ZM16 29.3334C8.63616 29.3334 2.66663 23.3638 2.66663 16.0001C2.66663 8.63628 8.63616 2.66675 16 2.66675C23.3637 2.66675 29.3333 8.63628 29.3333 16.0001C29.3333 23.3638 23.3637 29.3334 16 29.3334ZM20.6666 16.6667C19.1938 16.6667 18 15.4729 18 14.0001C18 12.5273 19.1938 11.3334 20.6666 11.3334C22.1394 11.3334 23.3333 12.5273 23.3333 14.0001C23.3333 15.4729 22.1394 16.6667 20.6666 16.6667Z"
                fill="black"
              />
            </svg>

            <p className="text-sm">Total Users</p>
            <span className="total font-extrabold text-3xl">
              {formatNumberWithCommas(metrics?.totalUsers || 0)}
            </span>
          </div>
          <div className="col space-y-4 p-5 py-5 rounded-2xl bg-[#F5F5F5] w-full lg:max-w-[380px] max-w-[300px]">
            <svg
              width="30"
              height="22"
              viewBox="0 0 30 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0065 0.337158C23.1067 0.337158 29.6732 3.91888 29.6732 8.33714V13.6705C29.6732 18.0887 23.1067 21.6705 15.0065 21.6705C7.05099 21.6705 0.574857 18.2155 0.346097 13.9063L0.339844 13.6705V8.33714C0.339844 3.91888 6.90634 0.337158 15.0065 0.337158ZM15.0065 16.3371C10.0459 16.3371 5.6605 14.9938 3.00622 12.9378L3.00651 13.6705C3.00651 16.1801 8.18335 19.0038 15.0065 19.0038C21.6875 19.0038 26.7901 16.2965 26.9999 13.8277L27.0065 13.6705L27.0081 12.9367C24.354 14.9934 19.968 16.3371 15.0065 16.3371ZM15.0065 3.00382C8.18335 3.00382 3.00651 5.82756 3.00651 8.33714C3.00651 10.8467 8.18335 13.6705 15.0065 13.6705C21.8297 13.6705 27.0065 10.8467 27.0065 8.33714C27.0065 5.82756 21.8297 3.00382 15.0065 3.00382Z"
                fill="black"
              />
            </svg>

            <p className="text-sm">Total Post Entries</p>
            <span className="total font-extrabold text-3xl">
              {formatNumberWithCommas(metrics?.totalPostEntries || 0)}
            </span>
          </div>
          <div className="col space-y-4 p-5 py-5 rounded-2xl bg-[#F5F5F5] w-full lg:max-w-[380px] max-w-[300px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 9.33333C11.3333 10.8061 10.1394 12 8.66663 12C7.19387 12 5.99996 10.8061 5.99996 9.33333C5.99996 7.86057 7.19387 6.66667 8.66663 6.66667C10.1394 6.66667 11.3333 7.86057 11.3333 9.33333ZM3.33329 9.33333C3.33329 12.2789 5.72111 14.6667 8.66663 14.6667C11.6121 14.6667 14 12.2789 14 9.33333C14 6.38781 11.6121 4 8.66663 4C5.72111 4 3.33329 6.38781 3.33329 9.33333ZM12 22C12 20.1591 10.5076 18.6667 8.66663 18.6667C6.82568 18.6667 5.33329 20.1591 5.33329 22V25.3333H12V22ZM14.6666 28H2.66663V22C2.66663 18.6863 5.35292 16 8.66663 16C11.9803 16 14.6666 18.6863 14.6666 22V28ZM26 9.33333C26 10.8061 24.8061 12 23.3333 12C21.8605 12 20.6666 10.8061 20.6666 9.33333C20.6666 7.86057 21.8605 6.66667 23.3333 6.66667C24.8061 6.66667 26 7.86057 26 9.33333ZM18 9.33333C18 12.2789 20.3878 14.6667 23.3333 14.6667C26.2788 14.6667 28.6666 12.2789 28.6666 9.33333C28.6666 6.38781 26.2788 4 23.3333 4C20.3878 4 18 6.38781 18 9.33333ZM26.6666 22C26.6666 20.1591 25.1742 18.6667 23.3333 18.6667C21.4924 18.6667 20 20.1591 20 22V25.3333H26.6666V22ZM17.3333 25.3333V22C17.3333 18.6863 20.0196 16 23.3333 16C26.647 16 29.3333 18.6863 29.3333 22V28H17.3333V25.3333Z"
                fill="black"
              />
            </svg>

            <p className="text-sm">Total Engaged</p>
            <span className="total font-extrabold text-3xl">
              {formatNumberWithCommas(metrics?.totalEngaged || 0)}
            </span>
          </div>
          <div className="col space-y-4 p-5 py-5 rounded-2xl bg-[#F5F5F5] w-full lg:max-w-[380px] max-w-[300px]">
            <svg
              width="26"
              height="29"
              viewBox="0 0 26 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6667 18.0026V20.7885C12.8326 20.4937 11.9351 20.3333 11 20.3333C6.58176 20.3333 3.00004 23.915 3.00004 28.3333H0.333374C0.333374 22.4422 5.109 17.6666 11 17.6666C11.9208 17.6666 12.8144 17.7833 13.6667 18.0026ZM11 16.3333C6.58004 16.3333 3.00004 12.7533 3.00004 8.33325C3.00004 3.91325 6.58004 0.333252 11 0.333252C15.42 0.333252 19 3.91325 19 8.33325C19 12.7533 15.42 16.3333 11 16.3333ZM11 13.6666C13.9467 13.6666 16.3334 11.2799 16.3334 8.33325C16.3334 5.38659 13.9467 2.99992 11 2.99992C8.05337 2.99992 5.66671 5.38659 5.66671 8.33325C5.66671 11.2799 8.05337 13.6666 11 13.6666ZM19 21.6666V17.6666H21.6667V21.6666H25.6667V24.3333H21.6667V28.3333H19V24.3333H15V21.6666H19Z"
                fill="black"
              />
            </svg>

            <p className="text-sm">Total Users Referral</p>
            <span className="total font-extrabold text-3xl">
              {formatNumberWithCommas(metrics?.totalReferred || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold font-fredoka">New Users</h2>
            <span className="grid place-content-center place-items-center p-0.5 px-2 bg-red-500 text-white rounded-full text-xs">
              20
            </span>
          </div>

          <div className="flex items-center">
            <div className="search-box relative text-[#181B20]">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full h-[48px] px-12 text-lg max-w-[200px]"
              />
            </div>

            <Button
              variant={"ghost"}
              className="cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
            >
              <TrashIcon />
              Trash
            </Button>
          </div>
        </div>

        <div className="table-x w-full">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
