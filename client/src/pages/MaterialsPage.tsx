import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookText, AudioLines, GraduationCap, Download, Search, 
  FileText, Filter, CheckCircle, Eye, Share2 
} from "lucide-react";

// Using the StudyMaterial type from our existing code
interface StudyMaterial {
  id: string;
  title: string;
  icon: 'text' | 'audio' | 'study';
  description: string;
  files: {
    name: string;
    format: string;
  }[];
  buttonText: string;
  buttonColor: 'primary' | 'secondary' | 'accent';
}

export default function MaterialsPage() {
  // Fetch study materials from our API
  const { data: materials, isLoading } = useQuery<StudyMaterial[]>({
    queryKey: ['/api/study-materials'],
  });

  // Function to render icon based on material type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'text':
        return <BookText className="h-6 w-6" />;
      case 'audio':
        return <AudioLines className="h-6 w-6" />;
      case 'study':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  // Group materials by type
  const textMaterials = materials?.filter(m => m.icon === 'text') || [];
  const audioMaterials = materials?.filter(m => m.icon === 'audio') || [];
  const studyGuides = materials?.filter(m => m.icon === 'study') || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Study Materials</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Access our comprehensive collection of texts, audio lectures, and study guides
          </p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search materials..."
              className="pl-10 text-sm h-9 sm:h-10"
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Featured Material */}
      <Card className="mb-8 overflow-hidden bg-accent text-accent-foreground">
        <div className="md:flex">
          <div className="md:w-2/3 p-6 md:p-8">
            <Badge className="mb-4 bg-primary/20 text-primary border-none">New Addition</Badge>
            <h2 className="text-2xl font-bold mb-2">The Complete Sanskrit Texts Collection</h2>
            <p className="mb-4">
              Access our comprehensive collection of Sanskrit texts, including the Upanishads, 
              Bhagavad Gita, and Brahma Sutras with translations and commentaries.
            </p>
            <div className="flex gap-3 mb-6">
              <Badge variant="outline" className="flex gap-1 items-center border-accent-foreground/20">
                <CheckCircle className="h-3 w-3" /> 120+ Texts
              </Badge>
              <Badge variant="outline" className="flex gap-1 items-center border-accent-foreground/20">
                <Eye className="h-3 w-3" /> 2.5k+ Downloads
              </Badge>
              <Badge variant="outline" className="flex gap-1 items-center border-accent-foreground/20">
                <FileText className="h-3 w-3" /> PDF Format
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Collection
              </Button>
              <Button variant="outline" className="border-accent-foreground/20">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3 bg-gradient-to-br from-primary/30 to-primary/10 p-8 flex items-center justify-center">
            <BookText className="h-32 w-32 text-primary/40" />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4 flex-wrap h-auto py-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm px-2 py-1 h-8">All Materials</TabsTrigger>
          <TabsTrigger value="texts" className="text-xs sm:text-sm px-2 py-1 h-8">Texts</TabsTrigger>
          <TabsTrigger value="audio" className="text-xs sm:text-sm px-2 py-1 h-8">Audio Lectures</TabsTrigger>
          <TabsTrigger value="guides" className="text-xs sm:text-sm px-2 py-1 h-8">Study Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array(6).fill(0).map((_, idx) => (
                <Card key={idx} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-muted"></div>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-9 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              materials?.map(material => (
                <Card key={material.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        material.buttonColor === 'primary' ? 'bg-primary/10 text-primary' :
                        material.buttonColor === 'secondary' ? 'bg-secondary/10 text-secondary' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {renderIcon(material.icon)}
                      </div>
                      <CardTitle>{material.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {material.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {material.files.map((file, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center">
                          <FileText className="mr-1 h-3 w-3" />
                          {file.name} ({file.format})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      variant={
                        material.buttonColor === 'primary' ? 'default' :
                        material.buttonColor === 'secondary' ? 'secondary' :
                        'outline'
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {material.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="texts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textMaterials.map(material => (
              <Card key={material.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <BookText className="h-6 w-6" />
                    </div>
                    <CardTitle>{material.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {material.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {material.files.map((file, idx) => (
                      <Badge key={idx} variant="outline" className="flex items-center">
                        <FileText className="mr-1 h-3 w-3" />
                        {file.name} ({file.format})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {material.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioMaterials.map(material => (
              <Card key={material.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                      <AudioLines className="h-6 w-6" />
                    </div>
                    <CardTitle>{material.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {material.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {material.files.map((file, idx) => (
                      <Badge key={idx} variant="outline" className="flex items-center">
                        <AudioLines className="mr-1 h-3 w-3" />
                        {file.name} ({file.format})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {material.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGuides.map(material => (
              <Card key={material.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <CardTitle>{material.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {material.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {material.files.map((file, idx) => (
                      <Badge key={idx} variant="outline" className="flex items-center">
                        <FileText className="mr-1 h-3 w-3" />
                        {file.name} ({file.format})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {material.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Advanced Search Section */}
      <div className="mt-8 sm:mt-12 bg-muted p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Advanced Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">Topic</label>
            <select className="w-full rounded-md border p-1.5 sm:p-2 bg-background text-xs sm:text-sm">
              <option value="">All Topics</option>
              <option value="vedanta">Vedanta</option>
              <option value="upanishads">Upanishads</option>
              <option value="bhagavad-gita">Bhagavad Gita</option>
              <option value="meditation">Meditation</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">Format</label>
            <select className="w-full rounded-md border p-1.5 sm:p-2 bg-background text-xs sm:text-sm">
              <option value="">All Formats</option>
              <option value="pdf">PDF</option>
              <option value="audio">Audio</option>
              <option value="document">Document</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">Language</label>
            <select className="w-full rounded-md border p-1.5 sm:p-2 bg-background text-xs sm:text-sm">
              <option value="">All Languages</option>
              <option value="english">English</option>
              <option value="sanskrit">Sanskrit</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
        </div>
        <Button size="sm" className="sm:text-base sm:h-10">Search Materials</Button>
      </div>

      {/* Membership Banner */}
      <div className="mt-8 sm:mt-12 bg-gradient-to-r from-primary to-primary/80 text-white p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Join Our Community</h2>
            <p className="text-sm sm:text-base mb-4 md:mb-0">
              Get unlimited access to all our study materials, exclusive courses, and community forums.
            </p>
          </div>
          <Button variant="secondary" size="sm" className="sm:text-base sm:h-10 whitespace-nowrap">
            Become a Member
          </Button>
        </div>
      </div>
    </div>
  );
}