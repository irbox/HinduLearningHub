import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Home, ArrowLeft, BookOpen, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="mb-8 relative">
        <div className="text-[140px] font-bold text-primary opacity-10 select-none">
          404
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="h-20 w-20 text-primary" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>

      <p className="text-muted-foreground text-lg max-w-md mb-8">
        The spiritual path you're looking for seems to have transcended this
        realm. Let us guide you back to your journey.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild variant="default" size="lg">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/search">
            <Search className="h-4 w-4 mr-2" />
            Search Content
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/books">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Books
          </Link>
        </Button>
      </div>

      <Button
        variant="ghost"
        className="mt-8"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Go Back
      </Button>
    </div>
  );
}
