import Image from "next/image";

type LoadingSplashProps = {
  subtitle?: string;
};

export default function LoadingSplash({
  subtitle = "Loading...",
}: LoadingSplashProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-blue-50 text-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
          <div className="absolute inset-2 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            <Image src="/img/at.jpg" alt="Admissions Topper" fill priority className="object-cover" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-base font-medium tracking-[0.06em] text-gray-900">Admissions Topper</p>
          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}