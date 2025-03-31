import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Clock, Info } from "lucide-react";
import type { Book } from "@shared/schema";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] group cursor-pointer">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
              <div className="relative h-60 w-44 mx-auto md:mx-0">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="h-full w-full object-cover rounded-md shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  {book.format && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary"
                    >
                      {book.format}
                    </Badge>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center rounded-md">
                  <div className="bg-primary/90 text-primary-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
                    <Info className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                {book.title}
              </h3>

              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-3 gap-2">
                <span className="font-medium">{book.author}</span>
                {book.publishYear && (
                  <>
                    <span className="text-primary text-xs">•</span>
                    <span>{book.publishYear}</span>
                  </>
                )}
                {book.pages && (
                  <>
                    <span className="text-primary text-xs">•</span>
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {book.pages} pages
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {book.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-primary border-primary/30 hover:bg-primary/10 text-xs rounded transition"
                >
                  <Download className="h-3 w-3 mr-2" />
                  {book.action || "Read Now"}
                </Button>

                {book.language && (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground text-xs"
                  >
                    {book.language}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
