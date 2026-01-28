import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Text from "./Text";
import type React from "react";
import Plus from "../icons/Plus";

type EmptyStateProps = {
    title?: string;
    description?: string;
    showButton?: boolean;
    buttonTitle?: string;
    onButtonClick?: () => void;
    leftIcon?: React.ElementType;
};

const EmptyState = ({ title, description, showButton = false, buttonTitle = "Add Product", onButtonClick, leftIcon: LeftIcon = Plus }: EmptyStateProps) => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        onButtonClick ? onButtonClick() : navigate("/products");
    }
    return (
        <div className={cn(
            "py-12 space-y-4 text-center",
            "flex flex-col items-center justify-center"
        )}>
            <Text as="h3" variant="subHeading" className={cn("text-foreground/60")}>
                {title}
            </Text>

            {description && (
                <Text as="p" variant="para" className={cn("text-foreground/50")}>
                    {description}
                </Text>
            )}

            {
                showButton && (

                    <Button
                        title={buttonTitle}
                        leftIcon={LeftIcon}
                        onClick={handleNavigation}
                    />
                )
            }

        </div>
    );
};

export default EmptyState;
