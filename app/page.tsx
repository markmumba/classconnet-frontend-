import Hero from "@/components/custom-ui/homepage/hero";
import About from "@/components/custom-ui/homepage/about";
import Featured from "@/components/custom-ui/homepage/featured";
import HowItWorks from "@/components/custom-ui/homepage/how-it-works";
import Invite from "@/components/custom-ui/homepage/invite";
import Footer from "@/components/custom-ui/homepage/footer";

export default function Home() {
  return (
    <>

      <Hero />
      <About />
      <Featured />
      <HowItWorks />
      <Invite />
      <Footer />
    </>
  );
}
