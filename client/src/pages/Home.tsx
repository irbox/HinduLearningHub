import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import VideoCard from "@/components/content/VideoCard";
import BookCard from "@/components/content/BookCard";
import FeaturedContent from "@/components/content/FeaturedContent";
import StudyMaterials from "@/components/content/StudyMaterials";
import { Video, Book } from "@shared/schema";
import {
  Search,
  BookOpen,
  VideoIcon,
  BookMarked,
  Sparkles,
  ChevronRight,
  Flame,
  History,
  HelpCircle,
} from "lucide-react";

// Temporarily remove onboarding to diagnose issues
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleStartTour = () => {
    console.log("Tour functionality temporarily disabled for debugging");
    // startTour('home');
  };

  const { data: videos, isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const { data: books, isLoading: booksLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  interface FeaturedContentType {
    featured: {
      id: string;
      title: string;
      thumbnail: string;
      duration: string;
      date: string;
    };
    relatedLectures: Array<{
      id: string;
      title: string;
      thumbnail: string;
      duration: string;
      channel: string;
      views: string;
    }>;
  }

  interface StudyMaterialType {
    id: string;
    title: string;
    icon: "text" | "audio" | "study";
    description: string;
    files: Array<{
      name: string;
      format: string;
    }>;
    buttonText: string;
    buttonColor: "primary" | "secondary" | "accent";
  }

  const { data: featuredContent } = useQuery<FeaturedContentType>({
    queryKey: ["/api/featured"],
  });

  const { data: studyMaterials } = useQuery<StudyMaterialType[]>({
    queryKey: ["/api/study-materials"],
  });

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

      {/* Hero Search Section */}
      <section className="mb-12">
        <div className="welcome-card rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background p-8 md:p-12 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Hindu Spiritual Wisdom
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Discover lectures, books, and study materials from Govardhan Math,
            Puri, and learn from the teachings of Shankaracharya tradition.
          </p>

          <form
            onSubmit={handleQuickSearch}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for videos, books, lectures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-6 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setSearchTerm("Shankaracharya");
                navigate(`/search?q=${encodeURIComponent("Shankaracharya")}`);
              }}
            >
              Shankaracharya
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setSearchTerm("Advaita");
                navigate(`/search?q=${encodeURIComponent("Advaita")}`);
              }}
            >
              Advaita
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setSearchTerm("Puri");
                navigate(`/search?q=${encodeURIComponent("Puri")}`);
              }}
            >
              Puri
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setSearchTerm("Vedanta");
                navigate(`/search?q=${encodeURIComponent("Vedanta")}`);
              }}
            >
              Vedanta
            </Badge>
          </div>
        </div>

        {/* Quick Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary/10 hover:bg-primary/15 transition cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <VideoIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Latest Lectures</h3>
                <p className="text-sm text-muted-foreground">
                  Latest spiritual discourses and talks
                </p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-primary" />
            </CardContent>
          </Card>

          <Card className="bg-primary/10 hover:bg-primary/15 transition cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Essential Texts</h3>
                <p className="text-sm text-muted-foreground">
                  Key scriptures and commentaries
                </p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-primary" />
            </CardContent>
          </Card>

          <Card className="bg-primary/10 hover:bg-primary/15 transition cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Popular Topics</h3>
                <p className="text-sm text-muted-foreground">
                  Trending discussions and questions
                </p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-primary" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="mb-12">
        <Tabs defaultValue="videos" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="videos"
                className="flex items-center gap-2 video-section"
              >
                <VideoIcon className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Books</span>
              </TabsTrigger>
            </TabsList>

            <Button variant="ghost" size="sm" className="text-primary">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <TabsContent value="videos" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Videos <span className="text-primary">•</span> Puri
                  Shankaracharya
                </h2>
                <p className="text-muted-foreground text-sm">
                  Explore the latest lectures, interviews, and discourses from
                  Govardhan Math
                </p>
              </div>

              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="hidden md:flex items-center gap-1"
                >
                  <Flame className="h-3 w-3 text-primary" />
                  Popular
                </Badge>
                <Badge
                  variant="outline"
                  className="hidden md:flex items-center gap-1"
                >
                  <History className="h-3 w-3" />
                  Recent
                </Badge>
              </div>
            </div>

            {videosLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <div className="bg-muted/50 h-40 animate-pulse"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-4 bg-muted/50 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos?.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline" className="px-8">
                    Load More Videos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="books" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Books <span className="text-primary">•</span> Shankaracharya &
                  Advaita
                </h2>
                <p className="text-muted-foreground text-sm">
                  Explore sacred texts, commentaries, and philosophical books
                  from Advaita tradition
                </p>
              </div>

              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="hidden md:flex items-center gap-1"
                >
                  <BookMarked className="h-3 w-3 text-primary" />
                  Featured
                </Badge>
                <Badge
                  variant="outline"
                  className="hidden md:flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  Popular
                </Badge>
              </div>
            </div>

            {booksLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <div className="bg-muted/50 h-48 animate-pulse"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-4 bg-muted/50 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books?.map((book) => <BookCard key={book.id} book={book} />)}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline" className="px-8">
                    Browse More Books
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Content */}
      {featuredContent && (
        <div className="featured-section">
          <FeaturedContent
            featured={featuredContent.featured}
            relatedLectures={featuredContent.relatedLectures}
          />
        </div>
      )}

      {/* Study Materials */}
      {studyMaterials && (
        <div className="course-section">
          <StudyMaterials materials={studyMaterials} />
        </div>
      )}
    </div>
  );
}
