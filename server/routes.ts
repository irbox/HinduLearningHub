import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const video = await storage.getVideoById(parseInt(req.params.id));
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  app.get("/api/videos/related/:id", async (req, res) => {
    try {
      const videos = await storage.getRelatedVideos(parseInt(req.params.id));
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related videos" });
    }
  });

  // Books
  app.get("/api/books", async (req, res) => {
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBookById(parseInt(req.params.id));
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  app.get("/api/books/related/:id", async (req, res) => {
    try {
      const books = await storage.getRelatedBooks(parseInt(req.params.id));
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related books" });
    }
  });

  // Featured Content
  app.get("/api/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedContent();
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured content" });
    }
  });

  // Study Materials
  app.get("/api/study-materials", async (req, res) => {
    try {
      const materials = await storage.getStudyMaterials();
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch study materials" });
    }
  });
  
  // Search content
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string || '';
      if (!query.trim()) {
        return res.json({ videos: [], books: [] });
      }
      
      // Check if channels parameter exists (comma-separated list)
      const channelsParam = req.query.channels as string;
      let channelFilters: string[] | undefined;
      
      if (channelsParam) {
        channelFilters = channelsParam.split(',');
      } else {
        // Default to Govardhan Math, Puri channel if no channels specified
        channelFilters = ['Govardhan Math, Puri'];
      }
      
      // Check if we should use live YouTube data
      const useYouTube = req.query.youtube === 'true';
      
      if (useYouTube) {
        // If using YouTube API directly
        const channelName = channelFilters && channelFilters.length > 0 ? channelFilters[0] : undefined;
        const videos = await storage.searchYouTubeVideos(query, channelName);
        const books = await storage.getAllBooks(); // Still use our books data
        
        return res.json({ videos, books });
      } else {
        // Use our local storage
        const results = await storage.searchContent(query, channelFilters);
        res.json(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ message: "Failed to search content" });
    }
  });
  
  // YouTube specific endpoints
  app.get("/api/youtube/search", async (req, res) => {
    try {
      const query = req.query.q as string || '';
      if (!query.trim()) {
        return res.json([]);
      }
      
      const channelName = req.query.channel as string;
      const videos = await storage.searchYouTubeVideos(query, channelName);
      res.json(videos);
    } catch (error) {
      console.error('YouTube search error:', error);
      res.status(500).json({ message: "Failed to search YouTube videos" });
    }
  });
  
  app.get("/api/youtube/channel", async (req, res) => {
    try {
      const channelName = req.query.channel as string;
      if (!channelName) {
        return res.status(400).json({ message: "Channel name is required" });
      }
      
      const videos = await storage.getYouTubeChannelVideos(channelName);
      res.json(videos);
    } catch (error) {
      console.error('YouTube channel error:', error);
      res.status(500).json({ message: "Failed to get YouTube channel videos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
