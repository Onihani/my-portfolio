// next
import Link from "next/link";
// imports
import { Mail } from "lucide-react";

// data
import { socials } from "@/common/data";

const Info = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-background text-2xl font-semibold">
          Nathaniel Quansah
        </h1>
        <h4 className={`text-black/80 text-lg font-medium text-center font-bricolageGrotesque`}>
          Software Engineer
        </h4>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          <Link
            href="mailto:n.bongo40@gmail.com"
            className="bg-background py-2 px-4 flex items-center gap-2 rounded-xl border border-secondary"
          >
            <Mail size={20} />
            <span className="text-sm font-bricolageGrotesque">
              n.bongo40@gmail.com
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-x-6 flex-nowrap">
          {socials.map(({ href, icon: SocialIcon, label }) => (
            <Link key={label} href={href}>
              <span className="sr-only">{label}</span>
              <SocialIcon size={20} color="black" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
