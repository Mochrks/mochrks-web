import React, { useEffect, useState } from "react";
import { fetchRSSData } from "@/services/medium-service";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { LoadingContent } from "./LoadingContent";
import { RSSData } from "@/types/rss";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

const extractImageFromDescription = (description: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = description;
  const img = tempDiv.querySelector("img");
  return img
    ? img.src
    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
};

const getSnippet = (html: string, maxLength: number = 200) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState<RSSData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const rssUrl = "https://medium.com/feed/@mochrks";
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchRSSData(rssUrl);

        // extract thumbnail
        const processedItems = result.items.map((item) => ({
          ...item,
          thumbnail: item.thumbnail || extractImageFromDescription(item.description),
        }));

        setData({ ...result, items: processedItems });
      } catch (err: any) {
        setError("Failed to fetch RSS data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load & error
  if (loading) {
    return (
      <div>
        <LoadingContent />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "No data available"}
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-[#0F1215] min-h-screen transition-colors duration-300 px-1 md:px-20">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-700 dark:text-white">Article</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Showing the latest 10 articles from Medium
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="h-4 w-4 text-gray-700 dark:text-white" />
            </div>
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-800 mb-8" />

          <div className="space-y-12">
            {data.items && data.items.length > 0 ? (
              data.items.map((post) => (
                <motion.div
                  key={post.guid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-6 border-b border-gray-500 dark:border-gray-700 pb-8"
                >
                  {/* Konten artikel */}
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {post.pubDate} | By {post.author}
                    </p>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-2xl font-bold mb-3 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                    </a>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post?.categories &&
                        post?.categories.length > 0 &&
                        post.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="px-2 py-1 text-xs">
                            {category}
                          </Badge>
                        ))}
                    </div>
                    <p className="text-md text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {getSnippet(post?.content || post.description)}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 dark:text-blue-400 font-semibold"
                      onClick={() => window.open(post.guid, "_blank")}
                    >
                      Read More
                    </Button>
                  </div>

                  {/*  thumbnail */}
                  <div className="hidden md:block w-64 h-48 relative flex-shrink-0">
                    <img
                      src={post.thumbnail ?? "/placeholder-image.jpg"}
                      alt={post.title}
                      className="object-cover rounded-lg w-full h-full shadow-md"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No articles found</p>
            )}
          </div>
          {data.items && data.items.length > 0 && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-20 mt-12">
              <InteractiveHoverButton
                onClick={() => window.open("https://medium.com/@mochrks", "_blank")}
                className="text-lg font-medium"
              >
                View All Articles
              </InteractiveHoverButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RSSFeed: React.FC = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default RSSFeed;
