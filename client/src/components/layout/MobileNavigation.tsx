import { Link, useLocation } from "wouter";
import { Home, BookOpen, Video, UserPlus } from "lucide-react";
import { navigationTabs } from "./Header";

export default function MobileNavigation() {
  const [location] = useLocation();

  // Filter for only Home, Videos, and Books tabs
  const mobileNavItems = navigationTabs.filter((tab) =>
    ["home", "videos", "books"].includes(tab.id),
  );

  // Map icons to navigation items
  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "videos":
        return <Video className="h-5 w-5" />;
      case "books":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-md z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {mobileNavItems.map((tab) => (
          <Link key={tab.id} href={tab.path}>
            <div
              className={`flex flex-col items-center justify-center cursor-pointer w-20 h-full ${
                location === tab.path ||
                (tab.id === "videos" && location.startsWith("/videos")) ||
                (tab.id === "books" && location.startsWith("/books"))
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full mb-1 ${
                  location === tab.path ||
                  (tab.id === "videos" && location.startsWith("/videos")) ||
                  (tab.id === "books" && location.startsWith("/books"))
                    ? "bg-primary/10"
                    : ""
                }`}
              >
                {getIcon(tab.id)}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </div>
          </Link>
        ))}

        {/* Sign In Button */}
        <Link href="#">
          <div className="flex flex-col items-center justify-center cursor-pointer w-20 h-full text-muted-foreground hover:text-foreground transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-full mb-1">
              <UserPlus className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">Sign In</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
