import { Card } from "@/components/ui/card";
import adLogo from "@/assets/ad-logo.png";

interface AdPlacementProps {
  size?: "small" | "medium" | "large" | "banner";
  className?: string;
}

const AdPlacement = ({ size = "medium", className = "" }: AdPlacementProps) => {
  const sizeClasses = {
    small: "h-32 w-full",
    medium: "h-48 w-full",
    large: "h-64 w-full",
    banner: "h-32 sm:h-40 w-full",
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} border border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 pt-8 rounded-lg`}>
      <img 
        src={adLogo} 
        alt="Ad placement" 
        className="w-16 h-16 object-contain opacity-60"
      />
      <div className="text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Place Your Ad Here
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Contact WECA for advertising opportunities
        </p>
      </div>
    </Card>
  );
};

export default AdPlacement;
