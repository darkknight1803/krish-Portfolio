import React from "react";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = "/Krish.jpeg", // ← updated to the actual image filename we are using
  alt = "Profile Image",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative group w-32 h-32 md:w-40 md:h-40 flex-shrink-0",
        className,
      )}
    >
      {/* Outer glowing blur ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-75 blur-md group-hover:opacity-100 animate-spin-slow transition duration-1000 group-hover:duration-200" />

      {/* Rotating sharp gradient border */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-yellow-400 to-cyan-500 animate-spin-slow"
        style={{ animationDuration: "4s" }}
      />

      {/* Dark spacer ring between border and image */}
      <div className="absolute inset-[3px] rounded-full bg-black z-10" />

      {/* Image container — sits inside the dark ring */}
      <div className="absolute inset-[5px] rounded-full overflow-hidden z-20">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-[50%_15%]"
          loading="lazy"
        />
        {/* Inner shadow overlay for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
      </div>
    </div>
  );
};

export default ProfileImage;
