import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FormatGrid } from "@/components/home/FormatGrid";
import { Faq } from "@/components/home/Faq";
import { ToolSection } from "@/components/home/ToolSection";

export default function HomePage() {
  return (
    <main className="bg-zinc-950 text-white">
      <Hero />
      <div className="mt-12">
        <ToolSection />
      </div>
      <ValueProps />
      <FormatGrid />
      <Faq />
    </main>
  );
}
