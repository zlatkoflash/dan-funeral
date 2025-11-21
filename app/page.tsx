import GuidsGrid from "@/components/directoriesgrid/GuidsGrid";
import HomeDirectory from "@/components/directoriesgrid/HomeDirectory";
import X3DirectoriesPanels from "@/components/directoriesgrid/X3DirectoriesPanels";
import HomeHeroBigImage from "@/components/heroes/HomeHeroBigImage";
import TestimonialsPanel from "@/components/testimonials/TestimonialsPanel";
// import Image from "next/image";

export default function Home() {

  return <>

    <HomeHeroBigImage />
    <HomeDirectory />
    <X3DirectoriesPanels />
    <TestimonialsPanel />
    <GuidsGrid />
  </>

}
