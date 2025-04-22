import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/custom/ScrollAnimation";
import siteConfig from "@/lib/siteConfig";

function Footer() {
  return (
    <div className="bg-black text-white flex justify-between items-center flex-wrap gap-x-6 gap-y-2 p-4 md:px-[5%] md:py-6 px-6">
      <FadeIn>
        <Link href={"/"} className="logo">
          <Image
            src="/images/logo.svg"
            alt="MetaDawgs"
            width={225}
            height={40}
            className="sm:w-[225px] w-[135px]"
          />
        </Link>
      </FadeIn>

      <FadeIn className="social-links flex items-center gap-4">
        <a
          href={siteConfig.socialLinks.telegram}
          className="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-white grid place-content-center place-items-center"
        >
          <svg
            width="30"
            height="30"
            className="sm:w-[30px] sm:h-[30px] w-[22px] h-[22px]"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.8009 17.0003C33.8009 26.2792 26.2787 33.8014 16.9998 33.8014C7.72082 33.8014 0.19873 26.2792 0.19873 17.0003C0.19873 7.72131 7.72082 0.199219 16.9998 0.199219C26.2787 0.199219 33.8009 7.72131 33.8009 17.0003ZM17.602 12.6025C15.9677 13.2822 12.7018 14.6891 7.8039 16.823C7.00856 17.1392 6.59194 17.4487 6.55401 17.7511C6.48991 18.2626 7.1302 18.4638 8.00212 18.738C8.12072 18.7753 8.24362 18.814 8.3696 18.855C9.22743 19.1337 10.3814 19.46 10.9813 19.4729C11.5254 19.4847 12.1328 19.2604 12.8033 18.7999C17.3795 15.7108 19.7417 14.1495 19.8901 14.1159C19.9948 14.092 20.1398 14.0623 20.2379 14.1495C20.3362 14.2369 20.3264 14.4022 20.3162 14.4465C20.2527 14.717 17.7392 17.0537 16.4387 18.2629C16.0507 18.6234 15.6727 18.9917 15.2916 19.359C14.4948 20.1271 13.8972 20.7033 15.3247 21.6441C16.772 22.5979 18.2301 23.5497 19.6416 24.5559C20.3377 25.0522 20.9632 25.4981 21.7357 25.427C22.1848 25.3857 22.6485 24.9635 22.8839 23.7044C23.4405 20.729 24.5346 14.282 24.7874 11.6253C24.8096 11.3926 24.7817 11.0947 24.7594 10.964C24.737 10.8332 24.6902 10.6469 24.5203 10.5089C24.3189 10.3456 24.0082 10.3112 23.8693 10.3136C23.2372 10.3248 22.2678 10.6619 17.602 12.6025Z"
              fill="black"
            />
          </svg>

          <span className="sr-only">Telegram</span>
        </a>

        <a
          href={siteConfig.socialLinks.twitter}
          className="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-white grid place-content-center place-items-center"
        >
          <svg
            width="24"
            height="24"
            className="sm:w-[24px] sm:h-[24px] w-[16px] h-[16px]"
            viewBox="0 0 34 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5554 0.983887L18.1604 10.5802L10.9019 0.983887H0.38916L12.9502 17.409L1.04524 31.0158H6.14297L15.3312 20.517L23.3613 31.0158H33.6137L20.5197 13.7052L31.6501 0.983887H26.5554ZM24.7674 27.9664L6.33855 3.87312H9.36794L27.5903 27.9664H24.7674Z"
              fill="black"
            />
          </svg>

          <span className="sr-only">Twitter</span>
        </a>
      </FadeIn>
    </div>
  );
}

export default Footer;
