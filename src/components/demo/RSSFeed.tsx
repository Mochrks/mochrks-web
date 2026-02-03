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

const extractImageFromDescription = (description: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = description;
  const img = tempDiv.querySelector("img");
  return img
    ? img.src
    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
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
          thumbnail: extractImageFromDescription(item.description),
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-white">Article</h1>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="h-4 w-4 text-gray-700 dark:text-white" />
            </div>
          </div>
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
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-2xl font-bold mb-2 text-gray-700 dark:text-white">
                        {post.title}
                      </h2>
                    </a>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                      {post.pubDate} | By {post.author}
                    </p>
                    <p className="text-md text-gray-700 dark:text-gray-400 mb-4">
                      Halo semuanya 👋
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-gray-800 dark:text-white"
                      onClick={() => window.open(post.guid, "_blank")}
                    >
                      Read More
                    </Button>
                  </div>

                  {/*  thumbnail */}
                  <div className="hidden md:block w-64 h-48 relative">
                    <img
                      src={post.thumbnail ?? "/placeholder-image.jpg"}
                      alt={post.title}
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No articles found</p>
            )}
          </div>
          {data.items && data.items.length > 0 && (
            <div className="flex justify-center mb-20 mt-10">
              <InteractiveHoverButton onClick={() => navigate("/")} className="text-lg font-medium">
                Back to Previous Page
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
