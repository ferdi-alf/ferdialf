/* eslint-disable @next/next/no-img-element */

import Bento from "@/components/Bento";
import SectionLayout from "@/components/layouts/SectionLayout";

import { useAbout } from "@/hooks/useAbout";

const About = () => {
  const { data, loading, error } = useAbout();

  if (loading) {
    return (
      <SectionLayout title="About Me">
        <div className="text-white mt-10">Loading...</div>
      </SectionLayout>
    );
  }

  if (error) {
    return (
      <SectionLayout title="About Me">
        <div className="text-red-500 mt-10">Error: {error}</div>
      </SectionLayout>
    );
  }

  if (!data) return null;
  return (
    <SectionLayout title="About Me">
      <p className="text-gray-300 mt-10 text-start font-sans text-sm md:text-lg font-normal md:leading-7">
        Hello, I&apos;m {data.name}, based in {data.contact.location}.<br />
        {data.description}
      </p>
      <div className="flex md:flex-row flex-col justify-between mt-5 items-center w-full gap-2">
        <div className="md:w-[30%] w-full">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/3vWkWEleRlujdT0MNY9J1m?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <div className="md:w-[70%] w-full">
          <img
            className="md:w-[96%] w-full"
            src="https://ghchart.rshah.org/26a641/ferdi-alf"
            alt="GitHub Contribution Chart"
          />
        </div>
      </div>
      <Bento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={0.5}
        particleCount={20}
      />
    </SectionLayout>
  );
};

export default About;
