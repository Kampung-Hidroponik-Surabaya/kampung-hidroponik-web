// src/components/shared/HeroContent.tsx
interface HeroContentProps {
  title: string;
  description: string;
}

export default function HeroContent({ title, description }: HeroContentProps) {
  return (
    <div
      className="flex flex-col items-start"
      style={{ width: "278px", gap: "15px", paddingBottom: "26px" }}
    >
      {/* Title */}
      <h1
        className="font-title font-bold text-white"
        style={{ fontSize: "42.508px" }}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className="font-sans font-normal text-white"
        style={{ fontSize: "14.785px" }}
      >
        {description}
      </p>
    </div>
  );
}
