import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VideoCard from "@/components/content/VideoCard";
import BookCard from "@/components/content/BookCard";
import { Video, Book } from "@shared/schema";
import {
  Search,
  Filter,
  Sparkles,
  RefreshCw,
  BookOpen,
  VideoIcon,
} from "lucide-react";

export default function SearchPage() {
  // Get the search query from URL
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const query = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("govardhan-math"); // Default to Govardhan Math

  // Available channels for filtering
  const channels = [
    {
      id: "govardhan-math",
      name: "Govardhan Math, Puri",
      value: "Govardhan Math, Puri",
    },
    { id: "all-channels", name: "All Channels", value: "" },
  ];

  // Map the channel ID to the actual channel name
  const getChannelValueById = (id: string) => {
    const channel = channels.find((c) => c.id === id);
    return channel ? channel.value : "";
  };

  // Get search results with channel filtering
  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery<{ videos: Video[]; books: Book[] }>({
    queryKey: ["search", query, selectedChannel], // Include channel in query key for proper caching
    queryFn: async () => {
      if (!query) return { videos: [], books: [] };

      // Get the actual channel value
      const channelValue = getChannelValueById(selectedChannel);

      // Build the URL with query parameters
      let searchUrl = `/api/search?q=${encodeURIComponent(query)}`;

      // Add channel filter if not "all channels"
      if (channelValue) {
        searchUrl += `&channels=${encodeURIComponent(channelValue)}`;
      }

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!query,
  });

  // Debug
  console.log("Search Query:", query);
  console.log("Selected Channel:", selectedChannel);
  console.log("Channel Value:", getChannelValueById(selectedChannel));
  console.log("Search Results:", searchResults);

  // Log the API endpoint being used
  if (query) {
    const channelValue = getChannelValueById(selectedChannel);
    let searchUrl = `/api/search?q=${encodeURIComponent(query)}`;
    if (channelValue) {
      searchUrl += `&channels=${encodeURIComponent(channelValue)}`;
    }
    console.log("API Endpoint:", searchUrl);
  }

  const filteredVideos = searchResults?.videos || [];
  const filteredBooks = searchResults?.books || [];

  // Combined results for the "All" tab
  const allResults = [
    ...filteredVideos.map((item) => ({ type: "video", item })),
    ...filteredBooks.map((item) => ({ type: "book", item })),
  ];

  // New search form state
  const [searchInput, setSearchInput] = useState(query);
  const [, navigate] = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const totalResults = filteredVideos.length + filteredBooks.length;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          {isLoading ? (
            <span className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Searching for "{query}"...
            </span>
          ) : (
            <span>Search Results for "{query}"</span>
          )}
        </h1>

        {/* Search refinement form */}
        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Input
                className="pl-4"
                type="text"
                placeholder="Refine your search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Channels</SelectLabel>
                  {channels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" className="sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        {isLoading ? (
          <div className="bg-muted/50 rounded-lg p-4 animate-pulse space-y-2">
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 items-center">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Sparkles className="h-3 w-3" />
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              <VideoIcon className="h-3 w-3" />
              {filteredVideos.length} video
              {filteredVideos.length !== 1 ? "s" : ""}
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              <BookOpen className="h-3 w-3" />
              {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}
            </Badge>
            {query && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-3 py-1"
              >
                {`"${query}"`}
              </Badge>
            )}
          </div>
        )}
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
          <TabsTrigger value="videos">
            Videos ({filteredVideos.length})
          </TabsTrigger>
          <TabsTrigger value="books">
            Books ({filteredBooks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {totalResults === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking
                for
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {allResults.map((result, index) => (
                <div key={`${result.type}-${index}`}>
                  {result.type === "video" ? (
                    <VideoCard video={result.item as Video} />
                  ) : (
                    <BookCard book={result.item as Book} />
                  )}
                  {index < allResults.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No videos found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search to find what you're looking for
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="books" className="mt-4">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No books found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search to find what you're looking for
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
