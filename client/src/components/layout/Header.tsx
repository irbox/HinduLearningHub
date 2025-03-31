import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Mic, Camera, UserPlus, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

// Export tabs so they can be used by the MobileNavigation component
export const navigationTabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "videos", label: "Videos", path: "/videos" },
  { id: "books", label: "Books", path: "/books" },
  { id: "search", label: "Search", path: "/search" },
];

export default function Header() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [, navigate] = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(mobileSearchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Logo and Search */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer min-w-fit">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold">
                ॐ
              </div>
              <h1 className="text-lg font-semibold text-primary">Dharma Vidya</h1>
            </div>
          </Link>
          
          {/* Search Bar and Navigation */}
          <div className="flex-1 flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 mx-2 md:mx-4 max-w-xl rounded-full bg-muted px-2 md:px-3 py-1 border border-border hidden sm:flex">
              <Input
                type="text"
                placeholder="Search for videos, books, lectures..."
                className="bg-transparent border-none outline-none shadow-none w-full text-foreground h-8 pl-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex items-center gap-1">
                <Button type="submit" variant="ghost" size="icon" className="text-primary h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="text-primary h-8 w-8 hidden md:flex">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {/* Mobile Search Button */}
          <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden text-primary h-8 w-8">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-10">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-center">Search</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleMobileSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search for videos, books, lectures..."
                  className="flex-1"
                  value={mobileSearchTerm}
                  onChange={(e) => setMobileSearchTerm(e.target.value)}
                  autoFocus
                />
                <SheetClose asChild>
                  <Button type="submit" variant="default">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </SheetClose>
              </form>
            </SheetContent>
          </Sheet>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Button className="hidden md:flex" variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Sign In
            </Button>
            <Avatar className="bg-primary h-8 w-8 hidden md:flex">
              <AvatarFallback className="text-primary-foreground">ॐ</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Navigation Tabs - Desktop */}
        <nav className="hidden md:flex items-center">
          {navigationTabs.filter(tab => ["home", "videos", "books"].includes(tab.id)).map(tab => (
            <Link key={tab.id} href={tab.path}>
              <span className={`whitespace-nowrap px-3 py-1 text-sm font-medium cursor-pointer flex items-center gap-1 ${
                location === tab.path || 
                (tab.id === "videos" && location.startsWith("/videos")) || 
                (tab.id === "books" && location.startsWith("/books"))
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}>
                {tab.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
