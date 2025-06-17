import { Typography } from "@material-tailwind/react";
import HeroSection from "./HeroSection";
import Image from "next/image";
import { Link } from "react-scroll";

const LINKS = [
  {
    title: "Product",
    items: ["How it Works", "Pricing", "Api Documentattion", "Integrations"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Blog", "Support"],
  },
  {
    title: "Support",
    items: ["Help Center", "Status Page", "Community", "Security"],
  },
];

const currentYear = new Date().getFullYear();

export function FooterWithSocialLinks() {
  return (
    <footer className="relative w-full pt-4">
      <HeroSection className="max-w-9xl px-8 ">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <div
              className="flex flex-row space-x-2"
              onClick={() => navigate("/")}
            >
              <Image
                src="/Schedulinked.png"
                alt="Schedulinked Logo"
                width={32} // Slightly bigger logo
                height={32}
              />
              <span className="font-extrabold text-2xl text-black">
                Schedulinked
              </span>{" "}
            </div>
            <Typography className="pt-4 pb-4 max-w-prose text-left break-words pr-4 text-sm text-gray-600">
              Marketing people actually want. Put your content straight into
              calendars with reminders, media, and automation.
              <br /> We&apos;re not trying to fix email. We&apos;re skipping it
              entirely. At Schedulinked, we believe your calendar isn&apos;t
              just for meet it&apos;s where attention lives.
            </Typography>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="lead"
                  color="black"
                  className="mb-3 font-bold text-md"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal text-sm transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">Schedulinked</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-6 sm:justify-center">
            <Link
              to="#"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-xs text-gray-700  hover:text-black font-medium transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-xs text-gray-700  hover:text-black font-medium transition-colors"
            >
              Terms of service
            </Link>
            <Link
              to="#"
              smooth={true}
              duration={500}
              offset={-80}
              className="cursor-pointer text-xs text-gray-700  hover:text-black font-medium transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </HeroSection>
    </footer>
  );
}
