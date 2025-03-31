import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Play, Clock } from "lucide-react";
import type { Video } from "@shared/schema";

type VideoCardProps = {
  video: Video;
};

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/videos/${video.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] group cursor-pointer">
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full object-cover h-52 transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="bg-primary/80 text-primary-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
              <Play className="h-6 w-6" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </div>
          {video.platform === "YouTube" && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="bg-red-600 hover:bg-red-700">
                YouTube
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <span className="font-medium">{video.channel}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {video.uploadDate}
            </div>
            {video.views && (
              <div className="text-xs text-muted-foreground">
                {video.views} views
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
