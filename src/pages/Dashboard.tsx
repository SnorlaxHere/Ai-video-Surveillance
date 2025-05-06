
import { useNavigate } from "react-router-dom";
import AnimalCard from "@/components/AnimalCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Clock, Dog, Cat, PawPrint } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const recentDetections = [
    {
      id: "1",
      type: "Deer",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      image: "photo-1485833077593-4278bba3f11f",
      location: "Front Yard Camera"
    },
    {
      id: "2",
      type: "Cat",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      image: "photo-1582562124811-c09040d0a901",
      location: "Backyard Camera"
    },
    {
      id: "3",
      type: "Dog",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      image: "photo-1535268647677-300dbf3d78d1",
      location: "Side Gate Camera"
    },
  ];

  const stats = [
    { 
      title: "Total Detections", 
      value: "27", 
      icon: <Camera className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-700"
    },
    { 
      title: "Deer Sightings", 
      value: "12", 
      icon: <PawPrint className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-700"
    },
    { 
      title: "Cat Sightings", 
      value: "8", 
      icon: <Cat className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-700"
    },
    { 
      title: "Dog Sightings", 
      value: "7", 
      icon: <Dog className="h-4 w-4" />,
      color: "bg-green-100 text-green-700"
    },
  ];

  const handleViewDetection = (id: string) => {
    navigate(`/timeline?id=${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage wildlife detections on your property
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/timeline")}>
            <Clock className="mr-2 h-4 w-4" />
            View Timeline
          </Button>
          <Button variant="outline" onClick={() => navigate("/upload")}>
            <Camera className="mr-2 h-4 w-4" />
            Upload Footage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent Detections</TabsTrigger>
          <TabsTrigger value="frequent">Frequent Visitors</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDetections.map((animal) => (
              <AnimalCard 
                key={animal.id}
                animal={animal}
                onView={handleViewDetection}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="frequent" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimalCard 
              animal={{
                id: "4",
                type: "Deer",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
                image: "photo-1485833077593-4278bba3f11f",
                location: "Front Yard Camera"
              }}
              onView={handleViewDetection}
            />
            <AnimalCard 
              animal={{
                id: "5",
                type: "Cat",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
                image: "photo-1582562124811-c09040d0a901", 
                location: "Backyard Camera"
              }}
              onView={handleViewDetection}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
