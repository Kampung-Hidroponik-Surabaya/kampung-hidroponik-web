// src/components/shared/HeroContent.tsx
interface HeroContentProps {
  title: string;
  description: string;
}

export default function HeroContent({ title, description }: HeroContentProps) {
  return (
    <div className="flex flex-col items-start gap-2 w-[278px] md:w-[700px] lg:w-[1200px]">
      <h1 className="font-title font-bold text-white text-[40px] md:text-[70px] lg:text-[96px] xl:text-[110px] leading-none mb-6">
        {title}
      </h1>
      <p className="font-sans font-normal text-white text-[13px] md:text-[18px] lg:text-[20px] md:max-w-[500px]">
        {description}
      </p>
    </div>
  );
}
