import { Progress } from "@/components/ui/progress";

interface ContributionMeterProps {
  current: number;
  goal: number;
}

const ContributionMeter = ({ current, goal }: ContributionMeterProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Annual Budget Goal</h3>
        <p className="text-muted-foreground">Help us reach our goal to support WECA operations</p>
      </div>
      
      <div className="relative mb-4">
        <Progress value={percentage} className="h-6 bg-muted" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-foreground mix-blend-difference">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm mb-6">
        <div>
          <span className="text-muted-foreground">Raised: </span>
          <span className="font-bold text-primary">${current.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Goal: </span>
          <span className="font-bold">${goal.toLocaleString()}</span>
        </div>
      </div>
      
      {remaining > 0 && (
        <p className="text-center text-muted-foreground">
          <span className="font-semibold text-foreground">${remaining.toLocaleString()}</span> still needed to reach our goal
        </p>
      )}
    </div>
  );
};

export default ContributionMeter;
