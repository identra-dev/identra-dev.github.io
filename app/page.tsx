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

export default function Home() {
  return (
    <main id="main" className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full">
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
  );
}
