export default function WorkLoading() {
  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Title skeleton */}
        <div className="h-10 w-48 rounded-lg bg-white/[0.04] animate-pulse mb-12" />

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-white/[0.04] animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
