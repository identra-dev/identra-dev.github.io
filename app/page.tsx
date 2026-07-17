import { Hero } from "@/components/sections/Hero";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { ProblemInsight } from "@/components/sections/ProblemInsight";
import { HowIdentraWorks } from "@/components/sections/HowIdentraWorks";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { SecurityTrust } from "@/components/sections/SecurityTrust";
import { Differentiation } from "@/components/sections/Differentiation";
import { Status } from "@/components/sections/Status";
import { FAQ } from "@/components/sections/FAQ";
import { DownloadFooter } from "@/components/sections/DownloadFooter";
import { BackgroundScene } from "@/components/ui/BackgroundScene";

export default function Home() {
  return (
    <>
      <BackgroundScene /> {/* Global fixed background; desktop + motion-OK only */}
      <main
        id="main"
        className="relative z-10 flex min-h-screen flex-col items-center justify-between w-full pointer-events-none"
      >
        {/* Sections must enable pointer-events-auto where needed */}
        <div className="w-full pointer-events-auto">
          <Hero />
          <ProductReveal />
          <ProblemInsight />
          <HowIdentraWorks />
          <ProductExperience />
          <SecurityTrust />
          <Differentiation />
          <Status />
          <FAQ />
          <DownloadFooter />
        </div>
      </main>
    </>
  );
}
