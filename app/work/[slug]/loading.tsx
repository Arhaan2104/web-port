export default function CaseStudyLoading() {
  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back nav skeleton */}
        <div className="h-4 w-24 rounded bg-white/[0.04] animate-pulse" />

        {/* Hero skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-3/4 rounded-lg bg-white/[0.04] animate-pulse" />
          <div className="h-6 w-1/2 rounded bg-white/[0.04] animate-pulse" />
        </div>

        {/* Hero image skeleton */}
        <div className="aspect-video rounded-2xl bg-white/[0.04] animate-pulse" />

        {/* Body skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-4/6 rounded bg-white/[0.04] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
