
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow, format } from "date-fns";
import { Calendar, Download, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Timeline = () => {
  const [searchParams] = useSearchParams();
  const selectedDetectionId = searchParams.get("id");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for demonstration
  const detections = [
    {
      id: "1",
      type: "Deer",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      image: "photo-1485833077593-4278bba3f11f",
      location: "Front Yard Camera",
      videoUrl: "#"
    },
    {
      id: "2",
      type: "Cat",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      image: "photo-1582562124811-c09040d0a901",
      location: "Backyard Camera",
      videoUrl: "#"
    },
    {
      id: "3",
      type: "Dog",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      image: "photo-1535268647677-300dbf3d78d1",
      location: "Side Gate Camera",
      videoUrl: "#"
    },
    {
      id: "4",
      type: "Deer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      image: "photo-1485833077593-4278bba3f11f",
      location: "Front Yard Camera",
      videoUrl: "#"
    },
    {
      id: "5",
      type: "Cat",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
      image: "photo-1582562124811-c09040d0a901",
      location: "Backyard Camera",
      videoUrl: "#"
    },
  ];

  const selectedDetection = selectedDetectionId 
    ? detections.find(d => d.id === selectedDetectionId) 
    : detections[0];

  // Group detections by date
  const groupedDetections = detections.reduce((groups, detection) => {
    const date = new Date(detection.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(detection);
    return groups;
  }, {} as Record<string, typeof detections>);

  const dateKeys = Object.keys(groupedDetections).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar with timeline events */}
      <div className="lg:w-1/3 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Detection Timeline</h2>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Animals
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {dateKeys.map(dateKey => (
            <div key={dateKey} className="space-y-4">
              <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                <h3 className="font-medium text-muted-foreground">
                  {new Date(dateKey).toDateString() === new Date().toDateString() 
                    ? "Today" 
                    : format(new Date(dateKey), "MMMM d, yyyy")}
                </h3>
                <Separator className="mt-2" />
              </div>
              
              <div className="space-y-4">
                {groupedDetections[dateKey].map(detection => (
                  <Card 
                    key={detection.id} 
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedDetection?.id === detection.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => {
                      // Update URL with detection ID without full page reload
                      const url = new URL(window.location.href);
                      url.searchParams.set("id", detection.id);
                      window.history.pushState({}, "", url);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative min-w-[80px] h-[80px] rounded-md overflow-hidden">
                          <img 
                            src={`https://images.unsplash.com/${detection.image}?auto=format&fit=crop&w=200&h=200&q=80`} 
                            alt={detection.type} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{detection.location}</h4>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${detection.type === 'Deer' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                                ${detection.type === 'Cat' ? 'bg-purple-100 text-purple-700 border-purple-200' : ''}
                                ${detection.type === 'Dog' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                              `}
                            >
                              {detection.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(detection.timestamp), "h:mm a")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(detection.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail view of selected detection */}
      {selectedDetection && (
        <div className="lg:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{selectedDetection.type} Detection</h2>
              <p className="text-muted-foreground">
                {selectedDetection.location} • {format(new Date(selectedDetection.timestamp), "MMM d, yyyy h:mm a")}
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Clip
            </Button>
          </div>

          <div className="rounded-lg overflow-hidden bg-black aspect-video relative">
            <img 
              src={`https://images.unsplash.com/${selectedDetection.image}?auto=format&fit=crop&w=1200&q=80`} 
              alt={selectedDetection.type} 
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </Button>
              <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-white" />
              </div>
              <span className="text-xs">00:08/00:24</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Detection Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Animal Type</dt>
                    <dd className="font-medium">{selectedDetection.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Location</dt>
                    <dd className="font-medium">{selectedDetection.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Date & Time</dt>
                    <dd className="font-medium">
                      {format(new Date(selectedDetection.timestamp), "MMMM d, yyyy h:mm a")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Detection ID</dt>
                    <dd className="font-medium text-sm font-mono">{selectedDetection.id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Activity Map</h3>
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Map visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
