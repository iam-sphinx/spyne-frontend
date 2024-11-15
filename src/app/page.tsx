import Footer from "@/components/ui/elements/footer";
import HowItWorks from "@/components/ui/elements/howItWorks";
import LandingBanner from "@/components/ui/elements/laindingBanner";
import MaxWidthWrapper from "@/components/ui/elements/maxWidthWrapper";
import Navbar from "@/components/ui/elements/landingNavbar";
import NewsLetter from "@/components/ui/elements/newsLetter";
import Testimonials from "@/components/ui/elements/testimonials";
import WhyChooseUs from "@/components/ui/elements/whyChooseUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <MaxWidthWrapper>
        <LandingBanner />
        <HowItWorks />
        <WhyChooseUs />
        <NewsLetter />
        <Testimonials />
      </MaxWidthWrapper>
      <Footer />
    </main>
  );
}
