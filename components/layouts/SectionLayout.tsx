import React from "react";
import ShinyText from "../ui/ShinyText";

interface SectionLayoutProps {
  children: React.ReactNode;
  title: string;
}

const SectionLayout = ({ children, title }: SectionLayoutProps) => {
  return (
    <div className="flex justify-center flex-col max-w-7xl md:w-4/5 w-full md:p-0 p-3 items-center">
      <ShinyText
        text={title}
        disabled={false}
        speed={2.5}
        className="text-5xl font-bold"
      />
      <div className="w-full">{children}</div>
    </div>
  );
};
export default SectionLayout;
