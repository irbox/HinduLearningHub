import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import {
  ChevronLeft,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  User,
  HelpCircle,
  BookOpen,
  Clock,
  Users,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import VideoCard from "@/components/content/VideoCard";
import { Video } from "@shared/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Temporarily commenting out for debugging
// import { useOnboarding } from "@/hooks/use-onboarding";

// Course type for courses section
type Course = {
  id: number;
  title: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  enrolledCount: number;
  rating: number;
  price: string;
  isFeatured: boolean;
  image: string;
  description: string;
};

export default function VideoPage() {
  const { id } = useParams();
  // Temporarily removed for debugging
  // const { startTour } = useOnboarding();

  const handleStartTour = () => {
    console.log("Tour functionality temporarily disabled for debugging");
    // startTour('video-page');
  };

  const { data: video, isLoading } = useQuery<Video>({
    queryKey: [`/api/videos/${id}`],
    enabled: !!id,
  });

  const { data: relatedVideos } = useQuery<Video[]>({
    queryKey: [`/api/videos/related/${id}`],
    enabled: !!id,
  });

  // Placeholder query until we implement a proper backend endpoint
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    queryFn: async () => {
      // This would normally fetch from a real API endpoint
      // For now, return mock data
      return [
        {
          id: 1,
          title: "Introduction to Advaita Vedanta",
          instructor: "Swami Vijayananda",
          level: "Beginner",
          category: "Philosophy",
          duration: "8 weeks",
          enrolledCount: 1240,
          rating: 4.8,
          price: "Free",
          isFeatured: true,
          image:
            "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "A comprehensive introduction to the non-dualistic philosophy of Advaita Vedanta. Learn about the nature of reality, consciousness, and the self.",
        },
        {
          id: 2,
          title: "Sanskrit for Beginners",
          instructor: "Dr. Aruna Sharma",
          level: "Beginner",
          category: "Language",
          duration: "12 weeks",
          enrolledCount: 850,
          rating: 4.6,
          price: "Free",
          isFeatured: false,
          image:
            "https://images.pexels.com/photos/6669861/pexels-photo-6669861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Learn the fundamentals of Sanskrit language, including the alphabet, basic grammar, and vocabulary. Perfect for spiritual seekers.",
        },
        {
          id: 3,
          title: "Deep Dive into Upanishads",
          instructor: "Swami Atmaprakashananda",
          level: "Intermediate",
          category: "Scripture",
          duration: "10 weeks",
          enrolledCount: 720,
          rating: 4.9,
          price: "Free",
          isFeatured: true,
          image:
            "https://images.pexels.com/photos/6666931/pexels-photo-6666931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Explore the profound wisdom of the Upanishads, ancient Sanskrit texts that form the foundation of Hindu philosophy.",
        },
        {
          id: 4,
          title: "Meditation Techniques",
          instructor: "Yogini Radha",
          level: "Beginner",
          category: "Practice",
          duration: "6 weeks",
          enrolledCount: 1560,
          rating: 4.7,
          price: "Free",
          isFeatured: false,
          image:
            "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Learn various meditation techniques from different traditions, with a focus on practical application for daily life.",
        },
        {
          id: 5,
          title: "Advanced Vedanta Philosophy",
          instructor: "Dr. Anand Sharma",
          level: "Advanced",
          category: "Philosophy",
          duration: "14 weeks",
          enrolledCount: 480,
          rating: 4.9,
          price: "Free",
          isFeatured: false,
          image:
            "https://images.pexels.com/photos/3958877/pexels-photo-3958877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "A deep exploration of advanced concepts in Vedanta philosophy, including Brahman, Maya, and the nature of consciousness.",
        },
        {
          id: 6,
          title: "The Bhagavad Gita in Daily Life",
          instructor: "Swami Krishnananda",
          level: "Intermediate",
          category: "Scripture",
          duration: "8 weeks",
          enrolledCount: 920,
          rating: 4.8,
          price: "Free",
          isFeatured: true,
          image:
            "https://images.pexels.com/photos/6452789/pexels-photo-6452789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Learn how to apply the timeless wisdom of the Bhagavad Gita to modern life challenges and personal growth.",
        },
      ];
    },
    placeholderData: [],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="bg-surface h-[calc(56.25vw)] max-h-[calc(100vh-250px)] rounded-lg mb-6"></div>
          <div className="h-8 bg-surface rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-surface rounded w-1/4 mb-6"></div>
          <div className="h-24 bg-surface rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!video && id) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Video Not Found</h2>
        <p className="mb-6">
          The video you are looking for doesn't exist or has been removed
        </p>
        <Link href="/videos">
          <Button>Browse All Videos</Button>
        </Link>
      </div>
    );
  }

  // If no ID is provided, show the videos listing with courses
  if (!id) {
    const featuredCourses =
      courses?.filter((course) => course.isFeatured) || [];

    return (
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-0">
            <h1 className="text-2xl font-bold mb-6">All Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVideos?.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            {/* Courses Hero Section */}
            <div className="courses-hero rounded-xl bg-gradient-to-r from-primary/90 to-primary p-4 sm:p-6 mb-8 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Spiritual Learning Path
              </h1>
              <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl">
                Explore our curated collection of courses on Hindu philosophy,
                Sanskrit, meditation, and more. All courses are free and taught
                by respected scholars and practitioners.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Browse All Courses
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 text-sm sm:text-base"
                >
                  Learn About Our Teachers
                </Button>
              </div>
            </div>

            {/* Featured Courses */}
            <section className="featured-courses mb-12">
              <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, idx) => (
                        <Card key={idx} className="animate-pulse">
                          <div className="h-48 bg-muted rounded-t-lg"></div>
                          <CardHeader>
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </CardHeader>
                          <CardContent>
                            <div className="h-4 bg-muted rounded w-full mb-2"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                          </CardContent>
                        </Card>
                      ))
                  : featuredCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                          {course.price === "Free" && (
                            <Badge className="absolute top-3 right-3 bg-primary">
                              Free
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            By {course.instructor}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {course.description}
                          </p>
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="mr-1 h-4 w-4" />
                              {course.category}
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              {course.enrolledCount.toLocaleString()} students
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Enroll Now</Button>
                        </CardFooter>
                      </Card>
                    ))}
              </div>
            </section>

            {/* All Courses */}
            <section className="all-courses">
              <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesLoading
                  ? Array(6)
                      .fill(0)
                      .map((_, idx) => (
                        <Card key={idx} className="animate-pulse">
                          <div className="h-48 bg-muted rounded-t-lg"></div>
                          <CardHeader>
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </CardHeader>
                          <CardContent>
                            <div className="h-4 bg-muted rounded w-full mb-2"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                          </CardContent>
                        </Card>
                      ))
                  : courses?.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                          {course.isFeatured && (
                            <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </div>
                          )}
                          {course.price === "Free" && (
                            <Badge className="absolute top-3 right-3 bg-primary">
                              Free
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                              {course.title}
                            </CardTitle>
                            <Badge
                              variant={
                                course.level === "Beginner"
                                  ? "outline"
                                  : course.level === "Intermediate"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {course.level}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center">
                            By {course.instructor}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {course.description}
                          </p>
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="mr-1 h-4 w-4" />
                              {course.category}
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              {course.enrolledCount.toLocaleString()} students
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Enroll Now</Button>
                        </CardFooter>
                      </Card>
                    ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Help button for starting tour */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full z-50"
        onClick={handleStartTour}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <Link href="/videos">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Videos
            </Button>
          </Link>

          {/* Video Player */}
          <div className="video-player relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${video?.youtubeId || ""}`}
              title={video?.title}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <h1 className="text-xl font-semibold mb-2">{video?.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>{video?.views} views</span>
            <span className="mx-2">•</span>
            <span>
              {typeof video?.uploadDate === "object"
                ? formatDistanceToNow(
                    new Date(video?.uploadDate as unknown as Date),
                    { addSuffix: true },
                  )
                : video?.uploadDate}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{video?.likes || 0}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Comment</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Channel Info */}
          <div className="flex items-start mb-6">
            <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium">{video?.channel}</h3>
              <p className="text-sm text-muted-foreground">
                {video?.subscribers || "1.2K"} subscribers
              </p>
            </div>
            <Button size="sm" variant="secondary" className="ml-auto">
              Subscribe
            </Button>
          </div>

          {/* Description/Transcript */}
          <div className="video-transcript bg-surface p-4 rounded-lg mb-6">
            <p className="text-sm whitespace-pre-line">
              {video?.description ||
                "This video explores the teachings of Puri Shankaracharya on Advaita Vedanta philosophy. The non-dualistic approach to understanding reality and consciousness is explained in simple terms."}
            </p>
          </div>
        </div>

        {/* Related Videos */}
        <div className="lg:w-1/3 related-videos">
          <h2 className="text-lg font-medium mb-4">Related Videos</h2>
          <div className="space-y-4">
            {relatedVideos?.map((video) => (
              <div key={video.id} className="flex gap-2">
                <div className="w-40 h-24 relative flex-shrink-0">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div>
                  <Link href={`/videos/${video.id}`}>
                    <h3 className="text-sm font-medium hover:text-primary cursor-pointer line-clamp-2">
                      {video.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">
                    {video.channel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {video.views} views •{" "}
                    {typeof video.uploadDate === "object"
                      ? formatDistanceToNow(
                          new Date(video.uploadDate as unknown as Date),
                          { addSuffix: true },
                        )
                      : video.uploadDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
