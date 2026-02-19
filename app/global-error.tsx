'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <html lang="en">
      <body className="bg-obsidian-base text-ink antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl md:text-4xl font-urbanist font-bold mb-4">
              Something went wrong
            </h1>
            <p className="text-content-muted mb-8 font-urbanist">
              An unexpected error occurred.
            </p>
            <button
              onClick={reset}
              className="glass-interactive px-6 py-3 rounded-lg text-sm font-medium text-content-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
