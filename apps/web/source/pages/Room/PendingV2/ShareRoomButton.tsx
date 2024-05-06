import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export default function ShareRoomButton() {
  const { roomCode } = useParams();

  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>Code de la partie</CardDescription>
        <CardTitle className="text-4xl">{roomCode}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Une partie se joue à trois minimum
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Partager le lien de la partie</Button>
      </CardFooter>
    </Card>
  );
}
