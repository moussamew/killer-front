import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function LaunchGameButton() {
  return (
    <Card className="w-1/3 bg-brand-foreground flex flex-col">
      <CardHeader className="pb-2">
        <CardDescription>Nombre de joueurs</CardDescription>
        <CardTitle className="text-4xl">5 joueurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Il manque 3 joueurs pour lancer la partie
        </div>
      </CardContent>
      <CardFooter>
        <Button>Lancer la partie</Button>
      </CardFooter>
    </Card>
  );
}
