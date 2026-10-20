import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";
import useEmblaCarousel from "embla-carousel-react";
import SlideCard from "./SlideCard";

const WorksCarousel = ({ posts, lang }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
    onSelect();
  }, [emblaApi, onSelect]);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="pt-16 md:pt-20">
      <div className="flex items-end justify-between">
        <h2 className="font-bold font-header text-4xl lg:text-4xl">Works</h2>
        <div className="flex items-center gap-2">
          <Link
            to="/worklist/1"
            className="mr-2 text-sm font-bold text-black underline hover:no-underline dark:text-white"
          >
            {lang === "ja" ? "一覧を見る →" : "View all →"}
          </Link>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            →
          </button>
        </div>
      </div>

      <div className="embla mt-6" ref={emblaRef}>
        <div className="embla__container">
          {posts.map(({ node }) => (
            <div className="embla__slide" key={node.id}>
              <SlideCard post={node} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-gray-800 dark:bg-white"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorksCarousel;
