
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface AnimalCardProps {
  animal: {
    id: string;
    type: string;
    timestamp: string;
    image: string;
    location: string;
  };
  onView: (id: string) => void;
}

const AnimalCard = ({ animal, onView }: AnimalCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={`https://images.unsplash.com/${animal.image}?auto=format&fit=crop&w=800&q=80`} 
          alt={animal.type} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2 bg-nature-alert text-white"
        >
          {animal.type}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">{animal.location}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-sm text-muted-foreground">
          Detected {formatDistanceToNow(new Date(animal.timestamp), { addSuffix: true })}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onView(animal.id)} 
          className="w-full"
        >
          View Footage
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
