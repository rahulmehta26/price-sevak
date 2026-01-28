import { cn } from "../../../utils/cn";
import Button from "../../../components/ui/Button";
import Bell from "../../../components/icons/Bell";
import ExternalLink from "../../../components/icons/ExternalLink";

const ProductActions = ({
    storeName,
    handleExternalLink,
}: {
    storeName: string;
    handleExternalLink: () => void;
}) => {
    return (
        <div
            className={cn(
                "flex md:justify-start pt-4 md:pt-0 justify-center flex-wrap items-center gap-4",
            )}
        >
            <Button
                title="Set Alert"
                variant="outline"
                textStyle={cn(" text-xs text-foreground ")}
                leftIcon={Bell}
                leftIconStyle={cn("stroke-foreground")}
                type="button"
            />
            <Button
                title={`View on ${storeName}`}
                leftIcon={ExternalLink}
                onClick={handleExternalLink}
                type="button"
            />
        </div>
    );
};

export default ProductActions;
