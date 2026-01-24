import { Link } from "react-router-dom"
import { navItems } from "../../constant/navItems"
import { cn } from "../../utils/cn"
import Text from "../ui/Text"
import { useState } from "react"

const NavItems = () => {

    const [activeIndex, setActiveIndex] = useState<number>(1);

    const handleActiveBar = (id: number) => {
        setActiveIndex(id)
    }
    return (
        <div
            className={cn(
                "flex justify-between items-center gap-4",
            )}
        >
            {
                navItems?.map((items) => {
                    return (
                        <Link
                            key={items?.id}
                            to={items?.href}
                            onClick={() => handleActiveBar(items?.id)}
                        >
                            <div
                                className={cn(
                                    "px-4 py-2",
                                    "rounded-sm group",
                                    activeIndex === items?.id ? "bg-primary" : "",
                                    activeIndex !== items?.id ? "hover:bg-primary/20" : ""
                                )}
                            >
                                <Text
                                    as="span"
                                    variant="base"
                                    className={cn(
                                        "font-bold tracking-normal font-mono",
                                        activeIndex === items?.id ? "text-background" : "text-foreground group-hover:text-primary"
                                    )}
                                >
                                    {
                                        items?.name
                                    }
                                </Text>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default NavItems