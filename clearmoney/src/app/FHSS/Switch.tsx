import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" checked={true} />
      <Label htmlFor="airplane-mode">Reinvest Tax Refund?</Label>
    </div>
  );
}
