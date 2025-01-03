// react
import { FC } from "react";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// imports
import * as Tooltip from "@radix-ui/react-tooltip";

// helpers
import { classnames } from "@/common/helpers";

// data
import { NavigationItem } from "@/common/data";

const NavItem: FC<NavigationItem> = ({ href, icon: IconComponent, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Tooltip.Provider delayDuration={350}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link
            href={href}
            scroll={false}
            className="group py-1.5 px-2 hover:fade-in-0 flex items-center justify-center gap-2 rounded-full transition-colors duration-700 ease-in-out"
          >
            <IconComponent
              size={20}
              strokeWidth={1.5}
              className={classnames(
                "group-hover:text-coral transition-colors duration-300 ease-in-out",
                isActive ? "text-coral" : "text-white/90"
              )}
            />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={10}
            className="z-50 overflow-hidden rounded-md bg-secondary px-2.5 py-1 text-xs text-white duration-200 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            {label}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default NavItem;
