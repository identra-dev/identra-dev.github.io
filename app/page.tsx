import { Hero } from "@/components/sections/Hero";
import { ProblemInsight } from "@/components/sections/ProblemInsight";
import { HowIdentraWorks } from "@/components/sections/HowIdentraWorks";
import { SecurityTrust } from "@/components/sections/SecurityTrust";
import { Differentiation } from "@/components/sections/Differentiation";
import { FAQ } from "@/components/sections/FAQ";
import { DownloadFooter } from "@/components/sections/DownloadFooter";

export default function Home() {
  return (
    <main id="main" className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <div className="w-full">
        <Hero />
        <ProblemInsight />
        <HowIdentraWorks />
        <Differentiation />
        <SecurityTrust />
        <FAQ />
        <DownloadFooter />
      </div>
    </main>
  );
}
