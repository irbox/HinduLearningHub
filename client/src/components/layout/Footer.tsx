import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-surface border-t border-gray-800 py-6", className)}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-om text-primary text-2xl"></i>
              <h2 className="text-xl font-semibold text-primary font-lora">
                Dharma Vidya
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A digital platform dedicated to preserving and spreading Hindu
              spiritual knowledge through videos, books, and study materials.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-sm">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/videos">
                    <span className="hover:text-primary cursor-pointer">
                      Videos
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/books">
                    <span className="hover:text-primary cursor-pointer">
                      Books
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/materials">
                    <span className="hover:text-primary cursor-pointer">
                      Study Materials
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/events">
                    <span className="hover:text-primary cursor-pointer">
                      Live Events
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">Information</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">
                    <span className="hover:text-primary cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contributors">
                    <span className="hover:text-primary cursor-pointer">
                      Contributors
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/community">
                    <span className="hover:text-primary cursor-pointer">
                      Community
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="hover:text-primary cursor-pointer">
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">Connect</h4>
              <div className="flex space-x-3 mb-4">
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
              <Button className="bg-primary text-white text-sm py-2 px-4 rounded-full hover:bg-primary/90 transition">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Dharma Vidya. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/terms">
              <span className="hover:text-primary cursor-pointer">Terms</span>
            </Link>
            <Link href="/privacy">
              <span className="hover:text-primary cursor-pointer">Privacy</span>
            </Link>
            <Link href="/cookies">
              <span className="hover:text-primary cursor-pointer">Cookies</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
