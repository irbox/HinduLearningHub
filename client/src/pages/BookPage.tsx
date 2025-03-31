import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import {
  ChevronLeft,
  Download,
  Share2,
  Bookmark,
  User,
  FileText,
  BookText,
  AudioLines,
  GraduationCap,
  Search,
  Filter,
  CheckCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/content/BookCard";
import { Book } from "@shared/schema";

export default function BookPage() {
  const { id } = useParams();

  const { data: book, isLoading } = useQuery<Book>({
    queryKey: [`/api/books/${id}`],
    enabled: !!id,
  });

  const { data: relatedBooks } = useQuery<Book[]>({
    queryKey: [`/api/books/related/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="flex gap-6">
            <div className="w-1/3 h-96 bg-surface rounded-lg"></div>
            <div className="w-2/3">
              <div className="h-8 bg-surface rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-surface rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-surface rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book && id) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
        <p className="mb-6">
          The book you are looking for doesn't exist or has been removed
        </p>
        <Link href="/books">
          <Button>Browse All Books</Button>
        </Link>
      </div>
    );
  }

  // If no ID is provided, show the books listing with study materials
  if (!id) {
    // Fetch study materials for the Materials tab
    const { data: materials, isLoading: materialsLoading } = useQuery<any[]>({
      queryKey: ["/api/study-materials"],
    });

    // Function to render icon based on material type
    const renderIcon = (iconType: string) => {
      switch (iconType) {
        case "text":
          return <BookText className="h-6 w-6" />;
        case "audio":
          return <AudioLines className="h-6 w-6" />;
        case "study":
          return <GraduationCap className="h-6 w-6" />;
        default:
          return <FileText className="h-6 w-6" />;
      }
    };

    return (
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="mt-0">
            <h1 className="text-2xl font-bold mb-6">All Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                  Study Materials
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Access our comprehensive collection of texts, audio lectures,
                  and study guides
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
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Featured Material */}
            <Card className="mb-8 overflow-hidden bg-accent text-accent-foreground">
              <div className="md:flex">
                <div className="md:w-2/3 p-6 md:p-8">
                  <Badge className="mb-4 bg-primary/20 text-primary border-none">
                    New Addition
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">
                    The Complete Sanskrit Texts Collection
                  </h2>
                  <p className="mb-4">
                    Access our comprehensive collection of Sanskrit texts,
                    including the Upanishads, Bhagavad Gita, and Brahma Sutras
                    with translations and commentaries.
                  </p>
                  <div className="flex gap-3 mb-6">
                    <Badge
                      variant="outline"
                      className="flex gap-1 items-center border-accent-foreground/20"
                    >
                      <CheckCircle className="h-3 w-3" /> 120+ Texts
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex gap-1 items-center border-accent-foreground/20"
                    >
                      <Eye className="h-3 w-3" /> 2.5k+ Downloads
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex gap-1 items-center border-accent-foreground/20"
                    >
                      <FileText className="h-3 w-3" /> PDF Format
                    </Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download Collection
                    </Button>
                    <Button
                      variant="outline"
                      className="border-accent-foreground/20"
                    >
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materialsLoading
                ? // Loading skeleton
                  Array(6)
                    .fill(0)
                    .map((_, idx) => (
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
                : materials?.map((material) => (
                    <Card key={material.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                              material.buttonColor === "primary"
                                ? "bg-primary/10 text-primary"
                                : material.buttonColor === "secondary"
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-accent/10 text-accent"
                            }`}
                          >
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
                            <Badge
                              key={idx}
                              variant="outline"
                              className="flex items-center"
                            >
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
                            material.buttonColor === "primary"
                              ? "default"
                              : material.buttonColor === "secondary"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {material.buttonText}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link href="/books">
        <Button variant="ghost" size="sm" className="mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Books
        </Button>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Book Cover */}
            <div className="md:w-1/3 flex justify-center">
              <img
                src={book?.coverUrl}
                alt={book?.title}
                className="max-h-96 rounded-lg shadow-lg object-contain"
              />
            </div>

            {/* Book Info */}
            <div className="md:w-2/3">
              <h1 className="text-2xl font-semibold text-primary mb-2">
                {book?.title}
              </h1>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <span>By {book?.author}</span>
                <span className="mx-2">•</span>
                <span>{book?.publishYear}</span>
                {book?.publisher && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{book?.publisher}</span>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Read Now</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
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

              <h3 className="font-medium text-lg mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {book?.description}
              </p>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {book?.language && (
                  <div>
                    <span className="text-muted-foreground">Language:</span>{" "}
                    {book.language}
                  </div>
                )}
                {book?.pages && (
                  <div>
                    <span className="text-muted-foreground">Pages:</span>{" "}
                    {book.pages}
                  </div>
                )}
                {book?.isbn && (
                  <div>
                    <span className="text-muted-foreground">ISBN:</span>{" "}
                    {book.isbn}
                  </div>
                )}
                {book?.format && (
                  <div>
                    <span className="text-muted-foreground">Format:</span>{" "}
                    {book.format}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Book Content */}
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Contents</TabsTrigger>
              <TabsTrigger value="about">About the Author</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-6">
              <div className="bg-surface p-4 rounded-lg">
                {book?.tableOfContents ? (
                  <div className="space-y-2">
                    {book.tableOfContents.map((chapter, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{chapter.title}</span>
                        <span className="text-muted-foreground">
                          p. {chapter.page}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Table of contents not available for this book.
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="bg-surface p-4 rounded-lg">
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{book?.author}</h3>
                    {book?.authorDetails?.bio && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {book.authorDetails.bio}
                      </p>
                    )}
                  </div>
                </div>
                {!book?.authorDetails?.bio && (
                  <p className="text-sm text-muted-foreground">
                    Author information not available.
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-surface p-4 rounded-lg">
                {book?.reviews && book.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {book.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-gray-700 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                            <span className="text-sm">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {review.author}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <div className="ml-auto flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < review.rating
                                    ? "text-accent"
                                    : "text-muted"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No reviews available for this book.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* PDF Viewer Section - Would be implemented with react-pdf */}
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Preview</h3>
            <div className="bg-surface p-4 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="mb-4">PDF Preview</p>
                <Button>Open PDF Reader</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="lg:w-1/3">
          <h2 className="text-lg font-medium mb-4">Related Books</h2>
          <div className="space-y-4">
            {relatedBooks?.slice(0, 3).map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <div className="bg-surface p-3 rounded-lg hover:bg-surface/60 transition cursor-pointer">
                  <div className="flex gap-3">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-primary">
                        {book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {book.author}, {book.publishYear}
                      </p>
                      <p className="text-xs line-clamp-2 mt-1">
                        {book.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/books">
              <Button variant="outline" className="w-full">
                View All Books
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
