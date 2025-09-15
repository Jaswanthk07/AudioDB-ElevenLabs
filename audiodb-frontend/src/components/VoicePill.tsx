import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoicePillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const VoicePill = ({ children, active = false, onClick }: VoicePillProps) => {
  return (
    <Button
      variant="pill"
      size="sm"
      onClick={onClick}
      className={cn(
        "text-xs font-medium rounded-full px-3 py-1 h-7",
        active && "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      {children}
    </Button>
  );
};

export default VoicePill;
