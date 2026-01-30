import { NavLink } from "react-router-dom";
import { navItems } from "../../constant/navItems";
import { cn } from "../../utils/cn";
import Text from "../ui/Text";
import Button from "../ui/Button";
import Signout from "../icons/Signout";
import MobileMenuButton from "./MobileMenuButton";
import { logout } from "../../services/auth";
import { useRef, useState } from "react";

const routePreloadMap: Record<string, () => Promise<unknown>> = {
    "/overview": () => import("../../page/overview/Overview"),
    "/products": () => import("../../page/product/Products"),
    "/activity": () => import("../../page/activity/Activity"),
    "/alerts": () => import("../../page/alert/Alert"),
};

const NavItems = () => {

    const preLoadedRef = useRef<Set<string>>(new Set());

    const handlerMouseEnter = (path: string) => {

        if (preLoadedRef.current.has(path)) return;

        const preLoad = routePreloadMap[path];

        if (!preLoad) return;

        preLoadedRef.current.add(path);
    }

    return (

        <div>
            <div className={cn("hidden lg:flex justify-between items-center gap-4")}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.href}
                        className={cn(
                            "relative px-4 py-2",
                            "rounded-sm group"
                        )}
                        onMouseEnter={() => handlerMouseEnter(item.href)}
                        onTouchStart={() => handlerMouseEnter(item.href)}
                    >
                        {({ isActive }) => (
                            <>
                                {!isActive && <span className="hover-slide-bg" />}

                                <Text
                                    as="span"
                                    variant="base"
                                    className={cn(
                                        "font-bold tracking-normal font-mono relative z-10",
                                        isActive
                                            ? "text-background bg-primary px-2 py-2 rounded-sm"
                                            : "text-foreground group-hover:text-primary"
                                    )}
                                >
                                    {item.name}
                                </Text>
                            </>
                        )}
                    </NavLink>
                ))}

                <Button
                    title="Sign out"
                    className={cn("py-2 md:py-2")}
                    rightIcon={Signout}
                    onClick={logout}
                />

            </div>

            {/* Mobile menu modal */}

            <MobileMenuButton />

        </div >
    );
};

export default NavItems;
