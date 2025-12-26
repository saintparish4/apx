"use client";

import { useDemoBanner } from "@/lib/use-demo-mode";
import { getDemoBannerConfig } from "@/lib/demo-mode";

export function DemoBanner() {
  const { visible, dismiss } = useDemoBanner();
  const config = getDemoBannerConfig();

  if (!visible || !config.show) {
    return null;
  }

  return (
    <div className="border-b border-amber-500/20 bg-amber-500/10 px-6 py-3 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20">
              <svg
                className="h-3 w-3 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-amber-200">{config.message}</p>
          </div>
          {config.dismissible && (
            <button
              onClick={dismiss}
              className="flex-shrink-0 rounded-lg p-1 text-amber-400 transition-colors hover:bg-amber-500/20 hover:text-amber-300"
              aria-label="Dismiss banner"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

