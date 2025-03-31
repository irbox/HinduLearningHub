import {
  users,
  type User,
  type InsertUser,
  type Video,
  type Book,
  type StudyMaterial,
} from "@shared/schema";
import * as YouTubeService from "./youtubeService";

// Channel ID mapping
const CHANNEL_NAMES: Record<string, string> = {
  "Govardhan Math, Puri": "UCqFCrpSpeqbzYaJbRn6vTkg", // This ID will be dynamically looked up
};

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Video methods
  getAllVideos(): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  getRelatedVideos(id: number): Promise<Video[]>;

  // Book methods
  getAllBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | undefined>;
  getRelatedBooks(id: number): Promise<Book[]>;

  // Search methods
  searchContent(
    query: string,
    channelFilters?: string[],
  ): Promise<{ videos: Video[]; books: Book[] }>;

  // YouTube methods
  searchYouTubeVideos(query: string, channelName?: string): Promise<Video[]>;
  getYouTubeChannelVideos(channelName: string): Promise<Video[]>;

  // Featured content
  getFeaturedContent(): Promise<any>;

  // Study materials
  getStudyMaterials(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videos: Map<number, Video>;
  private books: Map<number, Book>;
  private featuredContent: any;
  private studyMaterials: any;
  private currentUserId: number;
  private currentVideoId: number;
  private currentBookId: number;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.books = new Map();
    this.currentUserId = 1;
    this.currentVideoId = 1;
    this.currentBookId = 1;

    // Initialize with mock data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id } as User; // Cast to User type
    this.users.set(id, user);
    return user;
  }

  // Video methods
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async getRelatedVideos(id: number): Promise<Video[]> {
    const currentVideo = this.videos.get(id);
    if (!currentVideo) return [];

    return Array.from(this.videos.values())
      .filter((video) => video.id !== id)
      .slice(0, 5);
  }

  // Book methods
  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBookById(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async getRelatedBooks(id: number): Promise<Book[]> {
    const currentBook = this.books.get(id);
    if (!currentBook) return [];

    return Array.from(this.books.values())
      .filter((book) => book.id !== id)
      .slice(0, 4);
  }

  // Featured content
  async getFeaturedContent(): Promise<any> {
    return this.featuredContent;
  }

  // Search methods
  async searchContent(
    query: string,
    channelFilters?: string[],
  ): Promise<{ videos: Video[]; books: Book[] }> {
    const queryLower = query.toLowerCase();

    // Get videos from specific channels or all videos if no channel filters
    let videos = Array.from(this.videos.values());

    // Apply channel filtering if requested
    if (channelFilters && channelFilters.length > 0) {
      videos = videos.filter((video) => channelFilters.includes(video.channel));
    }

    // Apply keyword filtering
    videos = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(queryLower) ||
        (video.description &&
          video.description.toLowerCase().includes(queryLower)) ||
        (video.tags &&
          video.tags.some((tag) => tag.toLowerCase().includes(queryLower))),
    );

    // For books, no channel filtering needed
    const books = Array.from(this.books.values()).filter(
      (book) =>
        book.title.toLowerCase().includes(queryLower) ||
        book.author.toLowerCase().includes(queryLower) ||
        book.description.toLowerCase().includes(queryLower) ||
        (book.category && book.category.toLowerCase().includes(queryLower)),
    );

    return { videos, books };
  }

  // Study materials
  async getStudyMaterials(): Promise<any> {
    return this.studyMaterials;
  }

  // YouTube methods
  async searchYouTubeVideos(
    query: string,
    channelName?: string,
  ): Promise<Video[]> {
    if (!channelName) {
      // Search across all of YouTube
      return YouTubeService.searchVideos(query);
    }

    // Get the channel ID for the specified channel
    let channelId = CHANNEL_NAMES[channelName];

    // If we don't have a cached channel ID, look it up
    if (!channelId) {
      const fetchedChannelId = await YouTubeService.getChannelId(channelName);
      if (fetchedChannelId) {
        // Cache the channel ID for future use
        channelId = fetchedChannelId;
        CHANNEL_NAMES[channelName] = fetchedChannelId;
      } else {
        console.error(`Could not find channel ID for ${channelName}`);
        return [];
      }
    }

    // Search for videos from that channel
    return YouTubeService.searchVideosFromChannel(query, channelId);
  }

  async getYouTubeChannelVideos(channelName: string): Promise<Video[]> {
    // Get the channel ID for the specified channel
    let channelId = CHANNEL_NAMES[channelName];

    // If we don't have a cached channel ID, look it up
    if (!channelId) {
      const fetchedChannelId = await YouTubeService.getChannelId(channelName);
      if (fetchedChannelId) {
        // Cache the channel ID for future use
        channelId = fetchedChannelId;
        CHANNEL_NAMES[channelName] = fetchedChannelId;
      } else {
        console.error(`Could not find channel ID for ${channelName}`);
        return [];
      }
    }

    // Get videos from that channel
    return YouTubeService.getChannelVideos(channelId);
  }

  // Initialize data
  private initializeData() {
    // Add videos
    this.addVideo({
      title: "Exclusive interview with Puri Shankaracharya Ji | Govardhan Math",
      description:
        "An exclusive interview with Puri Shankaracharya Ji discussing Advaita Vedanta philosophy.",
      thumbnailUrl: "https://img.youtube.com/vi/LrVLAVVaLHs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=LrVLAVVaLHs",
      youtubeId: "LrVLAVVaLHs",
      duration: "6:44",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "14 Sept 2023",
      views: "25K views",
      likes: 1250,
      subscribers: "450K",
      category: "Interview",
      tags: ["Shankaracharya", "Interview", "Philosophy"],
    });

    this.addVideo({
      title:
        "Govardhan Math, Puri: Hindu Dharma Principles and Modern Applications",
      description:
        "Learn about core Hindu Dharma principles and how they apply to modern life, as taught by the Shankaracharya of Puri.",
      thumbnailUrl: "https://img.youtube.com/vi/yxTR5UoSf-M/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=yxTR5UoSf-M",
      youtubeId: "yxTR5UoSf-M",
      duration: "5:23",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "22 Oct 2023",
      views: "18K views",
      likes: 950,
      subscribers: "320K",
      category: "Philosophy",
      tags: ["Govardhan Math", "Hinduism", "Philosophy"],
    });

    // Add more videos based on the screenshots
    this.addVideo({
      title: "भगवान की प्राप्ति का सहज उपाय क्या है? Puri Shankaracharya Ji",
      description:
        "Puri Shankaracharya Ji explains the easiest approach to reach God through Hindu philosophy and practice.",
      thumbnailUrl: "https://img.youtube.com/vi/XYZ123456/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=XYZ123456",
      youtubeId: "XYZ123456",
      duration: "6:11",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "7 Oct 2023",
      views: "15K views",
      likes: 850,
      subscribers: "320K",
      category: "Spirituality",
      tags: ["Shankaracharya", "Puri", "Spirituality", "Hindu philosophy"],
    });

    this.addVideo({
      title: "Nischalananda Saraswati Ji Maharaj, Shankaracharya Of Puri",
      description:
        "Detailed talk by the Shankaracharya of Puri on Hindu traditions and spiritual practices.",
      thumbnailUrl: "https://img.youtube.com/vi/ABC567890/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=ABC567890",
      youtubeId: "ABC567890",
      duration: "4:07",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "11 Jan 2024",
      views: "12K views",
      likes: 720,
      subscribers: "250K",
      category: "News",
      tags: ["Shankaracharya", "Puri", "Hindu traditions"],
    });

    this.addVideo({
      title: "Exclusive: Pujya Puri Shankaracharya Ji On Original Varna System",
      description:
        "Puri Shankaracharya Ji discusses the original Varna system in Hindu philosophy and its misinterpretations.",
      thumbnailUrl: "https://img.youtube.com/vi/DEF789012/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=DEF789012",
      youtubeId: "DEF789012",
      duration: "22:47",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "3 Jan 2024",
      views: "35K views",
      likes: 1750,
      subscribers: "1.5M",
      category: "Interview",
      tags: ["Shankaracharya", "Puri", "Varna system", "Hindu philosophy"],
    });

    this.addVideo({
      title: "क्षय और पराजय पर ऐसे होगा निर्णय॥ Puri Shankaracharya",
      description:
        "Puri Shankaracharya discusses the philosophical concepts of decay and defeat, and how to overcome challenges.",
      thumbnailUrl: "https://img.youtube.com/vi/dZjDHjGkUqU/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dZjDHjGkUqU",
      youtubeId: "dZjDHjGkUqU",
      duration: "4:53",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "6 May 2023",
      views: "22K views",
      likes: 1100,
      subscribers: "320K",
      category: "Philosophy",
      tags: ["Philosophy", "Spirituality", "Hindu Philosophy"],
    });

    this.addVideo({
      title: "भगवान की प्राप्ति का सहज उपाय क्या है? Puri Shankaracharya Ji",
      description:
        "Puri Shankaracharya Ji explains the simple ways to attain spiritual connection with the divine.",
      thumbnailUrl: "https://img.youtube.com/vi/pfZvUih_JW8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=pfZvUih_JW8",
      youtubeId: "pfZvUih_JW8",
      duration: "6:11",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "7 Oct 2023",
      views: "32K views",
      likes: 1840,
      subscribers: "320K",
      category: "Spirituality",
      tags: ["Spirituality", "Divine Connection", "Hinduism"],
    });

    this.addVideo({
      title: "Nischalananda Saraswati Ji Maharaj, Shankaracharya Of Puri",
      description:
        "A documentary on the life and teachings of Nischalananda Saraswati Ji Maharaj, the Shankaracharya of Puri.",
      thumbnailUrl: "https://img.youtube.com/vi/Tk_NS3MYe_c/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=Tk_NS3MYe_c",
      youtubeId: "Tk_NS3MYe_c",
      duration: "4:07",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "11 Jan 2024",
      views: "15K views",
      likes: 730,
      subscribers: "280K",
      category: "Documentary",
      tags: ["Documentary", "Biography", "Shankaracharya"],
    });

    this.addVideo({
      title:
        "Exclusive: Pujya Puri Shankaracharya Ji On Origin Of Vedic System",
      description:
        "Pujya Puri Shankaracharya Ji discusses the origins and development of the Vedic system in this exclusive interview.",
      thumbnailUrl: "https://img.youtube.com/vi/h5C_pCY1Xas/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=h5C_pCY1Xas",
      youtubeId: "h5C_pCY1Xas",
      duration: "22:47",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "3 Jan 2024",
      views: "45K views",
      likes: 2160,
      subscribers: "1.2M",
      category: "Interview",
      tags: ["Vedic System", "Interview", "Hinduism"],
    });

    this.addVideo({
      title: "क्षय और पराजय पर ऐसे होगा निर्णय॥ Puri Shankaracharya",
      description:
        "Puri Shankaracharya discusses the philosophical concepts of decay and defeat, and how to overcome challenges.",
      thumbnailUrl: "https://img.youtube.com/vi/dZjDHjGkUqU/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dZjDHjGkUqU",
      youtubeId: "dZjDHjGkUqU",
      duration: "4:53",
      platform: "YouTube",
      channel: "Govardhan Math, Puri",
      uploadDate: "6 May 2023",
      views: "22K views",
      likes: 1100,
      subscribers: "320K",
      category: "Philosophy",
      tags: ["Philosophy", "Spirituality", "Hindu Philosophy"],
    });

    // Add books
    this.addBook({
      title: "Self-Knowledge: The Absolute Oneness of Ultimate Reality",
      author: "Roy Eugene Davis",
      description:
        "Besides expounding his non-dualistic views as presented in Self-Knowledge (Sanskrit Atma Bodha), he also wrote poems and composed hymns.",
      coverUrl:
        "https://m.media-amazon.com/images/I/51GW0WzeTeL._SY445_SX342_.jpg",
      publishYear: "2012",
      publisher: "CSA Press",
      action: "Preview",
      language: "English",
      pages: 184,
      isbn: "978-0877072782",
      format: "Paperback",
      fileUrl: "/books/self-knowledge.pdf",
      category: "Philosophy",
      tableOfContents: [
        { title: "Introduction to Non-dualism", page: 1 },
        { title: "The Nature of Consciousness", page: 25 },
        { title: "Practical Applications", page: 78 },
      ],
      authorDetails: {
        bio: "Roy Eugene Davis was a direct disciple of Paramahansa Yogananda and taught meditation and spiritual growth practices for more than 60 years.",
      },
      reviews: [
        {
          author: "Spiritual Seeker",
          date: "March 15, 2022",
          rating: 5,
          content:
            "This book provides clear insights into Advaita philosophy in an accessible way.",
        },
      ],
    });

    this.addBook({
      title: "Adi Shankaracharya: Hinduism's Greatest Thinker",
      author: "Pavan K. Varma",
      description:
        "A must-read for people across the ideological spectrum, this book reminds readers about the remarkable philosophical underpinning of Hinduism.",
      coverUrl:
        "https://m.media-amazon.com/images/I/41jngBxgQ+L._SY445_SX342_.jpg",
      publishYear: "2020",
      publisher: "Tranquebar",
      action: "More editions",
      language: "English",
      pages: 364,
      isbn: "978-9388689618",
      format: "Hardcover",
      fileUrl: "/books/adi-shankaracharya.pdf",
      category: "Biography",
      tableOfContents: [
        { title: "Early Life", page: 1 },
        { title: "Philosophical Contributions", page: 42 },
        { title: "Legacy", page: 210 },
      ],
      authorDetails: {
        bio: "Pavan K. Varma is a writer-diplomat and now a politician, who has been a member of the Rajya Sabha, the upper house of the Indian parliament.",
      },
      reviews: [
        {
          author: "History Buff",
          date: "January 8, 2021",
          rating: 4,
          content:
            "Well-researched biography that places Shankaracharya in the proper historical and cultural context.",
        },
      ],
    });

    this.addBook({
      title: "Shankaracharya - Page 30",
      author: "Prem Lata",
      description:
        "... Puri, where he stayed for some time. Here he composed the famous Jagannathashtak Stotra, and established the Purva Amnaya-pitha math for...",
      coverUrl:
        "https://m.media-amazon.com/images/I/41N9sr0YViL._SY445_SX342_.jpg",
      publishYear: "1982",
      publisher: "Sumit Publications",
      action: "Snippet view",
      language: "English",
      pages: 152,
      isbn: "978-0866350004",
      format: "Paperback",
      fileUrl: "/books/shankaracharya-excerpt.pdf",
      category: "Biography",
      tableOfContents: null,
      authorDetails: null,
      reviews: null,
    });

    this.addBook({
      title: "Advaita Vedanta: A Philosophical Reconstruction",
      author: "Eliot Deutsch",
      description:
        "A clear, comprehensive presentation of Advaita Vedanta, the philosophical system expounded by Shankara, that influenced all schools of Indian philosophy.",
      coverUrl:
        "https://m.media-amazon.com/images/I/51YzaYdl7tL._SY445_SX342_.jpg",
      publishYear: "1973",
      publisher: "University of Hawaii Press",
      action: "Preview",
      language: "English",
      pages: 132,
      isbn: "978-0824802714",
      format: "Paperback",
      fileUrl: "/books/advaita-vedanta.pdf",
      category: "Philosophy",
      tableOfContents: [
        { title: "The Metaphysical Background", page: 1 },
        { title: "The Logic of Non-dualism", page: 35 },
        { title: "Consciousness and Self", page: 73 },
      ],
      authorDetails: {
        bio: "Eliot Deutsch was a philosopher, professor, and writer who specialized in comparative philosophy, Asian philosophy, and Advaita Vedanta.",
      },
      reviews: [
        {
          author: "Philosophy Student",
          date: "August 22, 2020",
          rating: 5,
          content:
            "Essential reading for anyone interested in Advaita philosophy.",
        },
      ],
    });

    this.addBook({
      title: "The Jagannath Temple at Puri: Architecture, Art and Ritual",
      author: "O.M. Starza",
      description:
        "This book documents the significance of this famous Hindu temple and the role of Shankaracharya in establishing the worship patterns.",
      coverUrl:
        "https://m.media-amazon.com/images/I/41-8wsiGfCL._SY445_SX342_.jpg",
      publishYear: "1993",
      publisher: "Brill Academic",
      action: "Full view",
      language: "English",
      pages: 256,
      isbn: "978-9004095090",
      format: "Hardcover",
      fileUrl: "/books/jagannath-temple.pdf",
      category: "Architecture",
      tableOfContents: [
        { title: "Historical Background", page: 1 },
        { title: "Temple Architecture", page: 48 },
        { title: "Rituals and Festivals", page: 152 },
      ],
      authorDetails: null,
      reviews: [
        {
          author: "Art Historian",
          date: "May 5, 2019",
          rating: 4,
          content:
            "Detailed examination of one of India's most important temples.",
        },
      ],
    });

    this.addBook({
      title: "SHANKARACHARYA: His Life and Times",
      author: "T.M.P. Mahadevan",
      description:
        "A comprehensive biography of the great Advaita philosopher that explores his travels throughout India and establishment of the four monastic orders.",
      coverUrl:
        "https://m.media-amazon.com/images/I/41e2oz0c-fL._SY445_SX342_.jpg",
      publishYear: "1968",
      publisher: "Bharatiya Vidya Bhavan",
      action: "Snippet view",
      language: "English",
      pages: 186,
      isbn: "978-0896840188",
      format: "Hardcover",
      fileUrl: "/books/shankaracharya-life.pdf",
      category: "Biography",
      tableOfContents: [
        { title: "Birth and Early Years", page: 1 },
        { title: "The Mission Begins", page: 38 },
        { title: "The Four Monasteries", page: 94 },
      ],
      authorDetails: {
        bio: "T.M.P. Mahadevan was a well-known Indian philosopher and professor of philosophy who specialized in Advaita Vedanta.",
      },
      reviews: null,
    });

    // Set featured content
    this.featuredContent = {
      featured: {
        id: "feat1",
        title:
          "The Essence of Advaita Philosophy: Teachings by Puri Shankaracharya",
        thumbnail: "https://img.youtube.com/vi/V1At9WZcIOk/maxresdefault.jpg",
        duration: "1:23:45",
        date: "25 Dec 2023",
      },
      relatedLectures: [
        {
          id: "rel1",
          title: "Understanding Maya: The Cosmic Illusion",
          thumbnail: "https://img.youtube.com/vi/q7NrdKr9egg/maxresdefault.jpg",
          duration: "12:34",
          channel: "Govardhan Math, Puri",
          views: "15K",
        },
        {
          id: "rel2",
          title: "The Four Paths of Yoga Explained",
          thumbnail: "https://img.youtube.com/vi/g_3TuFe4PtI/maxresdefault.jpg",
          duration: "18:22",
          channel: "Govardhan Math, Puri",
          views: "8.2K",
        },
        {
          id: "rel3",
          title: "Bhagavad Gita: Key Teachings for Modern Life",
          thumbnail: "https://img.youtube.com/vi/hJCL_Q0tPYo/maxresdefault.jpg",
          duration: "27:15",
          channel: "Govardhan Math, Puri",
          views: "22K",
        },
      ],
    };

    // Set study materials
    this.studyMaterials = [
      {
        id: "sm1",
        title: "Sanskrit Texts",
        icon: "text",
        description:
          "Original Sanskrit texts with translations and commentaries by Shankaracharya.",
        files: [
          { name: "Vivekachudamani", format: "PDF" },
          { name: "Bhaja Govindam", format: "PDF" },
          { name: "Atma Bodha", format: "PDF" },
        ],
        buttonText: "Download All Texts",
        buttonColor: "primary",
      },
      {
        id: "sm2",
        title: "Audio Lectures",
        icon: "audio",
        description:
          "Listen to discourses on Advaita philosophy and Vedanta teachings.",
        files: [
          { name: "Introduction to Advaita", format: "MP3" },
          { name: "Brahma Sutras Explained", format: "MP3" },
          { name: "Understanding Karma", format: "MP3" },
        ],
        buttonText: "Browse Audio Collection",
        buttonColor: "secondary",
      },
      {
        id: "sm3",
        title: "Study Guides",
        icon: "study",
        description:
          "Structured learning materials for deeper understanding of Hindu philosophy.",
        files: [
          { name: "Beginners Guide to Vedanta", format: "Document" },
          { name: "Understanding the Four Vedas", format: "Document" },
          { name: "Meditation Techniques", format: "Document" },
        ],
        buttonText: "Access Study Materials",
        buttonColor: "accent",
      },
    ];
  }

  private addVideo(video: Omit<Video, "id">): Video {
    const id = this.currentVideoId++;
    const newVideo = { ...video, id } as Video;
    this.videos.set(id, newVideo);
    return newVideo;
  }

  private addBook(book: Omit<Book, "id">): Book {
    const id = this.currentBookId++;
    const newBook = { ...book, id } as Book;
    this.books.set(id, newBook);
    return newBook;
  }
}

export const storage = new MemStorage();
