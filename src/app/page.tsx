import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { PopularLessons } from "@/components/home/PopularLessons";
import { DailyPractice } from "@/components/home/DailyPractice";
import { Testimonials } from "@/components/home/Testimonials";
import { Statistics } from "@/components/home/Statistics";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PopularLessons />
      <DailyPractice />
      <Testimonials />
      <Statistics />
      <Newsletter />
    </>
  );
}
