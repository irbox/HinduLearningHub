import { google, youtube_v3 } from "googleapis";
import { Video } from "@shared/schema";
import dotenv from "dotenv";

dotenv.config();

// Create a function to get the YouTube client with the latest API key
function getYouTubeClient(): youtube_v3.Youtube {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error(
      "YouTube API key is missing! YouTube functionality will not work.",
    );
  }

  return google.youtube({
    version: "v3",
    auth: apiKey,
  });
}

// Type for YouTube search response items
interface YouTubeSearchItem {
  id?: {
    videoId?: string;
    channelId?: string;
  };
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
    };
  };
}

// Type for YouTube video details
interface YouTubeVideoDetail {
  id?: string;
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
}

// Log YouTube API key status (without revealing the key)
console.log(
  "YouTube API key status:",
  process.env.YOUTUBE_API_KEY ? "Available" : "Missing",
);

/**
 * Get channel ID from channel username
 */
export async function getChannelId(
  channelName: string,
): Promise<string | null> {
  try {
    console.log(`Getting channel ID for: ${channelName}`);
    const youtube = getYouTubeClient();
    const response = await youtube.search.list({
      part: ["snippet"],
      q: channelName,
      type: ["channel"],
      maxResults: 1,
    });

    if (response.data.items && response.data.items.length > 0) {
      const channelId = response.data.items[0].id?.channelId || null;
      console.log(`Found channel ID: ${channelId} for ${channelName}`);
      return channelId;
    }
    console.log(`No channel found for: ${channelName}`);
    return null;
  } catch (error) {
    console.error("Error getting channel ID:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}

/**
 * Search for videos from a specific channel
 */
export async function searchVideosFromChannel(
  query: string,
  channelId: string,
): Promise<Video[]> {
  try {
    console.log(
      `Searching videos with query "${query}" from channel: ${channelId}`,
    );
    const youtube = getYouTubeClient();
    const response = await youtube.search.list({
      part: ["snippet"],
      q: query,
      channelId: channelId,
      type: ["video"],
      maxResults: 20,
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log(
        `No videos found for query "${query}" in channel ${channelId}`,
      );
      return [];
    }

    // Get video details for duration and statistics
    const videoIds = response.data.items
      .map((item: YouTubeSearchItem) => item.id?.videoId)
      .filter(Boolean) as string[];

    if (videoIds.length === 0) {
      console.log("No valid video IDs found in search results");
      return [];
    }

    console.log(`Found ${videoIds.length} videos, fetching details`);
    const videoDetails = await youtube.videos.list({
      part: ["contentDetails", "statistics"],
      id: videoIds,
    });

    return response.data.items.map((item: YouTubeSearchItem, index: number) => {
      const videoId = item.id?.videoId || "";
      const details = videoDetails.data.items?.find(
        (v: YouTubeVideoDetail) => v.id === videoId,
      );

      // Format duration from ISO 8601 to readable format (PT1H2M3S -> 1:02:03)
      let formattedDuration = "";
      if (details?.contentDetails?.duration) {
        const duration = details.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
          const hours = match[1] ? `${match[1]}:` : "";
          const minutes = match[2] ? `${match[2]}:` : "0:";
          const seconds = match[3] ? match[3].padStart(2, "0") : "00";
          formattedDuration = `${hours}${minutes}${seconds}`;
        }
      }

      // Format view count
      let formattedViews = "";
      if (details?.statistics?.viewCount) {
        const viewCount = parseInt(details.statistics.viewCount, 10);
        if (viewCount >= 1000000) {
          formattedViews = `${(viewCount / 1000000).toFixed(1)}M views`;
        } else if (viewCount >= 1000) {
          formattedViews = `${(viewCount / 1000).toFixed(1)}K views`;
        } else {
          formattedViews = `${viewCount} views`;
        }
      }

      // Convert to our Video type
      return {
        id: index, // Using index since the real ID is stored in youtubeId
        title: item.snippet?.title || "",
        description: item.snippet?.description || "",
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || "",
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeId: videoId,
        duration: formattedDuration,
        platform: "YouTube",
        channel: item.snippet?.channelTitle || "Govardhan Math, Puri",
        uploadDate: item.snippet?.publishedAt
          ? new Date(item.snippet.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        views: formattedViews,
        likes: details?.statistics?.likeCount
          ? parseInt(details.statistics.likeCount, 10)
          : 0,
        subscribers: "", // Not available from this API
        category: "Spirituality", // Default category
        tags: [], // Default empty tags array
      };
    });
  } catch (error) {
    console.error("Error searching videos from channel:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [];
  }
}

/**
 * Get videos from a specific channel (without search)
 */
export async function getChannelVideos(
  channelId: string,
  maxResults: number = 20,
): Promise<Video[]> {
  try {
    console.log(
      `Fetching up to ${maxResults} videos from channel: ${channelId}`,
    );
    const youtube = getYouTubeClient();
    const response = await youtube.search.list({
      part: ["snippet"],
      channelId: channelId,
      type: ["video"],
      maxResults: maxResults,
      order: "date", // Get most recent videos
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log(`No videos found for channel ${channelId}`);
      return [];
    }

    // Get video details for duration and statistics
    const videoIds = response.data.items
      .map((item: YouTubeSearchItem) => item.id?.videoId)
      .filter(Boolean) as string[];

    if (videoIds.length === 0) {
      console.log("No valid video IDs found in search results");
      return [];
    }

    console.log(`Found ${videoIds.length} videos, fetching details`);
    const videoDetails = await youtube.videos.list({
      part: ["contentDetails", "statistics"],
      id: videoIds,
    });

    return response.data.items.map((item: YouTubeSearchItem, index: number) => {
      const videoId = item.id?.videoId || "";
      const details = videoDetails.data.items?.find(
        (v: YouTubeVideoDetail) => v.id === videoId,
      );

      // Format duration from ISO 8601 to readable format
      let formattedDuration = "";
      if (details?.contentDetails?.duration) {
        const duration = details.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
          const hours = match[1] ? `${match[1]}:` : "";
          const minutes = match[2] ? `${match[2]}:` : "0:";
          const seconds = match[3] ? match[3].padStart(2, "0") : "00";
          formattedDuration = `${hours}${minutes}${seconds}`;
        }
      }

      // Format view count
      let formattedViews = "";
      if (details?.statistics?.viewCount) {
        const viewCount = parseInt(details.statistics.viewCount, 10);
        if (viewCount >= 1000000) {
          formattedViews = `${(viewCount / 1000000).toFixed(1)}M views`;
        } else if (viewCount >= 1000) {
          formattedViews = `${(viewCount / 1000).toFixed(1)}K views`;
        } else {
          formattedViews = `${viewCount} views`;
        }
      }

      // Convert to our Video type
      return {
        id: index, // Using index since the real ID is stored in youtubeId
        title: item.snippet?.title || "",
        description: item.snippet?.description || "",
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || "",
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeId: videoId,
        duration: formattedDuration,
        platform: "YouTube",
        channel: item.snippet?.channelTitle || "Govardhan Math, Puri",
        uploadDate: item.snippet?.publishedAt
          ? new Date(item.snippet.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        views: formattedViews,
        likes: details?.statistics?.likeCount
          ? parseInt(details.statistics.likeCount, 10)
          : 0,
        subscribers: "", // Not available from this API
        category: "Spirituality", // Default category
        tags: [], // Default empty tags array
      };
    });
  } catch (error) {
    console.error("Error getting channel videos:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [];
  }
}

/**
 * Search for videos across YouTube
 */
export async function searchVideos(
  query: string,
  maxResults: number = 20,
): Promise<Video[]> {
  try {
    console.log(`Searching YouTube videos with query: "${query}"`);
    const youtube = getYouTubeClient();
    const response = await youtube.search.list({
      part: ["snippet"],
      q: query,
      type: ["video"],
      maxResults: maxResults,
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log(`No videos found for query "${query}"`);
      return [];
    }

    // Get video details for duration and statistics
    const videoIds = response.data.items
      .map((item: YouTubeSearchItem) => item.id?.videoId)
      .filter(Boolean) as string[];

    if (videoIds.length === 0) {
      console.log("No valid video IDs found in search results");
      return [];
    }

    console.log(`Found ${videoIds.length} videos, fetching details`);
    const videoDetails = await youtube.videos.list({
      part: ["contentDetails", "statistics"],
      id: videoIds,
    });

    return response.data.items.map((item: YouTubeSearchItem, index: number) => {
      const videoId = item.id?.videoId || "";
      const details = videoDetails.data.items?.find(
        (v: YouTubeVideoDetail) => v.id === videoId,
      );

      // Format duration from ISO 8601 to readable format
      let formattedDuration = "";
      if (details?.contentDetails?.duration) {
        const duration = details.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
          const hours = match[1] ? `${match[1]}:` : "";
          const minutes = match[2] ? `${match[2]}:` : "0:";
          const seconds = match[3] ? match[3].padStart(2, "0") : "00";
          formattedDuration = `${hours}${minutes}${seconds}`;
        }
      }

      // Format view count
      let formattedViews = "";
      if (details?.statistics?.viewCount) {
        const viewCount = parseInt(details.statistics.viewCount, 10);
        if (viewCount >= 1000000) {
          formattedViews = `${(viewCount / 1000000).toFixed(1)}M views`;
        } else if (viewCount >= 1000) {
          formattedViews = `${(viewCount / 1000).toFixed(1)}K views`;
        } else {
          formattedViews = `${viewCount} views`;
        }
      }

      // Convert to our Video type
      return {
        id: index, // Using index since the real ID is stored in youtubeId
        title: item.snippet?.title || "",
        description: item.snippet?.description || "",
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || "",
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        youtubeId: videoId,
        duration: formattedDuration,
        platform: "YouTube",
        channel: item.snippet?.channelTitle || "",
        uploadDate: item.snippet?.publishedAt
          ? new Date(item.snippet.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        views: formattedViews,
        likes: details?.statistics?.likeCount
          ? parseInt(details.statistics.likeCount, 10)
          : 0,
        subscribers: "", // Not available from this API
        category: "Spirituality", // Default category
        tags: [], // Default empty tags array
      };
    });
  } catch (error) {
    console.error("Error searching videos across YouTube:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return [];
  }
}
