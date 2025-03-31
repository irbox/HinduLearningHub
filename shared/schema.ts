import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url"),
  youtubeId: text("youtube_id"),
  duration: text("duration").notNull(),
  platform: text("platform").notNull(),
  channel: text("channel").notNull(),
  uploadDate: text("upload_date").notNull(),
  views: text("views").default("0 views"),
  likes: integer("likes").default(0),
  subscribers: text("subscribers"),
  category: text("category"),
  tags: text("tags").array(),
  hasTranscript: boolean("has_transcript").default(false),
  transcript: text("transcript"),
  automaticTranscript: boolean("automatic_transcript").default(true),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Books
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  publishYear: text("publish_year").notNull(),
  publisher: text("publisher"),
  action: text("action").default("Preview"),
  language: text("language"),
  pages: integer("pages"),
  isbn: text("isbn"),
  format: text("format"),
  fileUrl: text("file_url"),
  category: text("category"),
  tableOfContents: jsonb("table_of_contents"),
  authorDetails: jsonb("author_details"),
  reviews: jsonb("reviews"),
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
});

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

// Study Materials
export const studyMaterials = pgTable("study_materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  files: jsonb("files").notNull(),
  buttonText: text("button_text").notNull(),
  buttonColor: text("button_color").notNull(),
});

export const insertStudyMaterialSchema = createInsertSchema(
  studyMaterials,
).omit({
  id: true,
});

export type InsertStudyMaterial = z.infer<typeof insertStudyMaterialSchema>;
export type StudyMaterial = typeof studyMaterials.$inferSelect;

// Featured Content
export const featuredContent = pgTable("featured_content", {
  id: serial("id").primaryKey(),
  featured: jsonb("featured").notNull(),
  relatedLectures: jsonb("related_lectures").notNull(),
});

export const insertFeaturedContentSchema = createInsertSchema(
  featuredContent,
).omit({
  id: true,
});

export type InsertFeaturedContent = z.infer<typeof insertFeaturedContentSchema>;
export type FeaturedContent = typeof featuredContent.$inferSelect;

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
