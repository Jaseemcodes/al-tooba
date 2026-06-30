export default function ShimmerCard() {
  return (
    <div className="w-full rounded-2xl border border-warm-light bg-white p-5 flex flex-col justify-between h-[420px] overflow-hidden">
      <div>
        <div className="w-full aspect-[4/3] rounded-2xl shimmer mb-6" />
        <div className="h-6 w-3/4 shimmer rounded-md mb-3" />
        <div className="h-4 w-1/4 shimmer rounded-md mb-4" />
        <div className="h-4 w-5/6 shimmer rounded-md mb-2" />
        <div className="h-4 w-2/3 shimmer rounded-md" />
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="h-6 w-1/4 shimmer rounded-md" />
        <div className="h-10 w-1/3 shimmer rounded-full" />
      </div>
    </div>
  );
}
