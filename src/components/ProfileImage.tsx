import React from "react";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = `${import.meta.env.BASE_URL}Krish.png`,
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
      {/* Image container */}
      <div className="absolute inset-0 rounded-full overflow-hidden z-20">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
