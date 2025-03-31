import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

type RelatedLecture = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
};

type FeaturedContentProps = {
  featured: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    date: string;
  };
  relatedLectures: RelatedLecture[];
};

export default function FeaturedContent({ featured, relatedLectures }: FeaturedContentProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 font-lora">
        Featured Content <span className="text-primary">•</span> Popular Lectures
      </h2>
      
      <Card className="bg-surface overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <div className="relative h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg overflow-hidden">
                  <img 
                    src={featured.thumbnail} 
                    alt="Featured video thumbnail" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer hover:bg-primary">
                      <Play className="text-white h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-medium">{featured.title}</h3>
                    <div className="flex items-center text-xs text-gray-300 mt-2">
                      <span>Featured Lecture</span>
                      <span className="mx-1">•</span>
                      <span>{featured.duration}</span>
                      <span className="mx-1">•</span>
                      <span>{featured.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <h4 className="text-primary font-medium mb-4 font-lora">Related Lectures</h4>
              
              <div className="space-y-4">
                {relatedLectures.map(lecture => (
                  <div key={lecture.id} className="flex items-start cursor-pointer hover:bg-surface/60 p-2 rounded-lg transition">
                    <div className="w-16 h-12 relative flex-shrink-0">
                      <img 
                        src={lecture.thumbnail} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {lecture.duration}
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium line-clamp-2">{lecture.title}</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lecture.channel} • {lecture.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-lg text-sm transition">
                View All Lectures
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
