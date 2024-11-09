import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FocusCards } from "@/components/ui/focus-cards";
import ScrollToTopButton from '@/components/demo/ScrollToTopButton'
import useBreakpoints from "@/hooks/useBreakpoints";
import { FlipLinkTitle } from '@/components/demo/Title'
import { projects, cards } from '@/apis/uiux'


interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
}

export default function index() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (projects.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (projects.length - 3)) % (projects.length - 3))
  }

  const { isMd } = useBreakpoints();
  return (
    <div className="relative  w-full">
      {/* title */}
      <section className=" place-content-center gap-2 bg-white px-8 py-14 lg:py-24 text-black">
        <FlipLinkTitle>DESIGN</FlipLinkTitle>
        <FlipLinkTitle>UI/UX.</FlipLinkTitle>
      </section>
      {isMd && (
        <div className='flex bg-white/10 py-5'>

          <div className='flex max-w-xl items-center justify-center px-5'>
            <div className='flex'>
              <Avatar className='w-[3rem] h-[3rem] mt-4 '>
                <AvatarImage src="https://mochrks.github.io/assets/img-photo/pf.jpg" alt="@mochrks" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className='px-5'>
                <h2 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text2xl'>Mochrks</h2>
                <p className="text-sm leading-1 [&:not(:first-child)]:mt-1">
                  Once upon a time, in a far-off land, there was a very lazy king who
                  spent all day lounging on his throne.
                </p>
              </div>
            </div>
          </div>

          <div className=" py-12 px-6 sm:px-6 lg:px-8 ">
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
                        className="flex-shrink-0 px-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card className="h-full bg-white">
                          <CardHeader className="p-0">
                            <div className="relative h-[15rem] lg:w-[35rem] lg:h-[25rem] overflow-hidden rounded-t-lg">
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
                {/* <Button
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
              </Button> */}
              </div>

            </div>
          </div>
        </div>
      )}
      {/* content web uiux */}
      <div className=' w-full h-full p-6 lg:p-20 '>
        <FocusCards cards={cards} />
      </div>
      <ScrollToTopButton />
    </div >
  );
}