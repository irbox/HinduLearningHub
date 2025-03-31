import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Globe, Clock, Users, Sparkles, GraduationCap, MoreVertical, HelpCircle } from "lucide-react";
// Temporarily commenting out for debugging
// import { useOnboarding } from "@/hooks/use-onboarding";

// Mock course data structure until we create a proper endpoint
type Course = {
  id: number;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  duration: string;
  enrolledCount: number;
  rating: number;
  price: string;
  isFeatured: boolean;
  image: string;
  description: string;
};

export default function CoursesPage() {
  // Temporarily removed for debugging
  // const { startTour } = useOnboarding();
  
  const handleStartTour = () => {
    console.log('Tour functionality temporarily disabled for debugging');
    // startTour('courses');
  };
  
  // Placeholder query until we implement a proper backend endpoint
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
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
          image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "A comprehensive introduction to the non-dualistic philosophy of Advaita Vedanta. Learn about the nature of reality, consciousness, and the self."
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
          image: "https://images.pexels.com/photos/6669861/pexels-photo-6669861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "Learn the fundamentals of Sanskrit language, including the alphabet, basic grammar, and vocabulary. Perfect for spiritual seekers."
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
          image: "https://images.pexels.com/photos/6666931/pexels-photo-6666931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "Explore the profound wisdom of the Upanishads, ancient Sanskrit texts that form the foundation of Hindu philosophy."
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
          image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "Learn various meditation techniques from different traditions, with a focus on practical application for daily life."
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
          image: "https://images.pexels.com/photos/3958877/pexels-photo-3958877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "A deep exploration of advanced concepts in Vedanta philosophy, including Brahman, Maya, and the nature of consciousness."
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
          image: "https://images.pexels.com/photos/6452789/pexels-photo-6452789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "Learn how to apply the timeless wisdom of the Bhagavad Gita to modern life challenges and personal growth."
        }
      ];
    },
    placeholderData: [],
  });

  const featuredCourses = courses?.filter(course => course.isFeatured) || [];
  const categoryCounts: Record<string, number> = {};
  
  courses?.forEach(course => {
    categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
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
      
      {/* Hero Section */}
      <div className="courses-hero rounded-xl bg-gradient-to-r from-primary/90 to-primary p-4 sm:p-6 mb-8 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Spiritual Learning Path</h1>
        <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl">
          Explore our curated collection of courses on Hindu philosophy, Sanskrit, meditation, and more.
          All courses are free and taught by respected scholars and practitioners.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base">
            <GraduationCap className="mr-2 h-4 w-4" />
            Browse All Courses
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/20 text-sm sm:text-base">
            Learn About Our Teachers
          </Button>
        </div>
      </div>

      {/* Featured Courses */}
      <section className="featured-courses mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Courses</h2>
          <Link href="/courses/featured">
            <Button variant="ghost" className="text-primary">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, idx) => (
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
          ) : (
            featuredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {course.price === "Free" && (
                    <Badge className="absolute top-3 right-3 bg-primary">Free</Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
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
            ))
          )}
        </div>
      </section>

      {/* All Courses */}
      <section className="all-courses">
        <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="courses-filters flex-wrap h-auto py-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm px-2 py-1 h-8">All</TabsTrigger>
              <TabsTrigger value="philosophy" className="text-xs sm:text-sm px-2 py-1 h-8">Philosophy</TabsTrigger>
              <TabsTrigger value="scripture" className="text-xs sm:text-sm px-2 py-1 h-8">Scripture</TabsTrigger>
              <TabsTrigger value="practice" className="text-xs sm:text-sm px-2 py-1 h-8">Practice</TabsTrigger>
              <TabsTrigger value="language" className="text-xs sm:text-sm px-2 py-1 h-8">Language</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Sort:</span>
              <select className="text-xs sm:text-sm border rounded px-1 sm:px-2 py-1 bg-background h-8">
                <option>Newest</option>
                <option>Popular</option>
                <option>Rated</option>
              </select>
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, idx) => (
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
              ) : (
                courses?.map(course => (
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
                        <Badge className="absolute top-3 right-3 bg-primary">Free</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant={
                          course.level === "Beginner" ? "outline" : 
                          course.level === "Intermediate" ? "secondary" : 
                          "default"
                        }>
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
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="philosophy" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                ?.filter(course => course.category === "Philosophy")
                .map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                      {course.price === "Free" && (
                        <Badge className="absolute top-3 right-3 bg-primary">Free</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant={
                          course.level === "Beginner" ? "outline" : 
                          course.level === "Intermediate" ? "secondary" : 
                          "default"
                        }>
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
          </TabsContent>

          <TabsContent value="scripture" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                ?.filter(course => course.category === "Scripture")
                .map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                      {course.price === "Free" && (
                        <Badge className="absolute top-3 right-3 bg-primary">Free</Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        By {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration}
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
          </TabsContent>

          {/* Other categories can be implemented similarly */}
        </Tabs>
      </section>

      <section className="mt-12 sm:mt-16 rounded-lg bg-muted p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Become a Teacher</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              Are you a scholar or practitioner with knowledge to share? Join our platform as a teacher and help spread the wisdom of Hindu philosophy and practices.
            </p>
            <Button variant="default" size="sm" className="sm:text-base sm:h-10">Apply to Teach</Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-14 w-14 sm:h-20 sm:w-20 text-primary/80" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}