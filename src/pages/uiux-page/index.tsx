import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Redesign",
    description: "A modern take on online shopping experiences",
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Finance App",
    description: "Simplifying personal finance management",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Centralized platform for social media management",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
  },
  {
    id: 4,
    title: "Travel Planner",
    description: "Streamlining travel itinerary creation",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"
  },
  {
    id: 5,
    title: "Health Tracker",
    description: "Monitoring personal health and fitness goals",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    title: "Smart Home Control",
    description: "Intuitive interface for managing smart home devices",
    imageUrl: "https://images.unsplash.com/photo-1558002038-bb4237b50b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },

]

export default function index() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (projects.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (projects.length - 3)) % (projects.length - 3))
  }
  return (
    <div className="relative  w-full">
      <Title />
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-currentIndex * 25}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="w-1/1 2xl:w-1/3  flex-shrink-0 px-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="h-full">
                      <CardHeader className="p-0">
                        <div className="relative h-[25rem] 2xl:h-[40rem] overflow-hidden rounded-t-lg">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 bg-white/10">
                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2  rounded-full shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2  rounded-full shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Title = () => {
  return (
    <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
      <FlipLink>DESIGN </FlipLink>
      <FlipLink>UI /UX.</FlipLink>
    </section>
  );
};
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"

      className="relative block overflow-hidden whitespace-nowrap text-5xl font-black uppercase sm:text-7xl md:text-7xl lg:text-8xl 2xl:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};