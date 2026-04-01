import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
  image?: string;
}

export default function PageHeader({ title, breadcrumb, image = "/img/carousel-2.jpg" }: PageHeaderProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-[#181d38] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: `url('${image}')` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#181d38] to-transparent opacity-80" />
      <div className="relative z-10 text-center px-4 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 slide-in-bottom tracking-tight">{title}</h1>
        <div className="text-white/80 flex items-center justify-center gap-2 font-medium text-sm md:text-base">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary">{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
}
