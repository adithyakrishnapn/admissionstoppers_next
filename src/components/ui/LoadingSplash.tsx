import Image from "next/image";

type LoadingSplashProps = {
  subtitle?: string;
};

export default function LoadingSplash({
  subtitle = "Admissionstopper",
}: LoadingSplashProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-2 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            <Image src="/img/at.jpg" alt="Admissions Topper" fill priority className="object-cover" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold tracking-[0.04em] text-secondary">Admissions Topper</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">{subtitle} loading</p>
          <div className="mx-auto mt-3 h-1 w-20 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-shimmer-x rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}