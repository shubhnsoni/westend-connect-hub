import fallbackBg from "@/assets/fallback-thumbnail-bg.png";

interface FallbackThumbnailProps {
  title: string;
  className?: string;
}

const FallbackThumbnail = ({ title, className = "" }: FallbackThumbnailProps) => {
  return (
    <div className={`relative overflow-hidden bg-[#f5f9f6] ${className}`}>
      <img
        src={fallbackBg}
        alt=""
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Title overlay */}
      <div className="absolute inset-0 flex items-start justify-center pt-6 px-4">
        <h3
          className="text-center font-cormorant font-bold leading-tight"
          style={{
            color: "#2d5a3d",
            fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
            maxWidth: "85%",
            textShadow: "0 1px 2px rgba(255,255,255,0.6)",
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default FallbackThumbnail;
