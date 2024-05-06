import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

export default function MissionsProgress() {
  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>Nombre de missions</CardDescription>
        <CardTitle className="text-4xl">3 Missions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Il faut au minimum le même nombre de missions que de joueurs
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
}
