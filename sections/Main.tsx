import ProfileCard from "@/components/ProfileCard";

const Main = () => {
  return (
    <div className="mb-10 max-w-7xl ">
      <h1 className="text-transparent bg-clip-text bg-linear-to-b text-sm sm:text-xl text-center  from-white to-gray-300 font-light">
        Hi, My name is Muhammad Ferdi Alfian
      </h1>
      <h1 className="text-transparent kata mb-3 pb-3 text-center bg-clip-text bg-linear-to-b  from-white to-gray-400 text-xl sm:text-4xl md:text-5xl  lg:text-6xl font-extrabold">
        Turning Ideas Into Interactive Realities <br /> Through Precision and
        Purpose
      </h1>

      <ProfileCard
        enableTilt={true}
        enableMobileTilt={false}
        behindGlowEnabled={false}
        avatarUrl="/images/avatar.png"
        name="Muhammad Ferdi Alfian"
        title="Fullstack Developer"
      />
    </div>
  );
};

export default Main;
