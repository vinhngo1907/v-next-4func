import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

export async function Results() {
  const data = await getStreams();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Streams we think you&apos;ll like</h2>
      {data.map((result) => (
        <ResultCard key={result.id} data={result} />
      ))}
    </div>
  )
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}