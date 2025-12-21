import { getSearch } from "@/lib/search-service"
import { ResultCard } from "./result-card";

export async function Results({ term }: { term?: string }) {
	const data = await getSearch();
	return (
		<div>
			<h2>Results for term &quot;{term}&quot;</h2>
			{data.length === 0 && (
				<p className="text text-muted-foreground text-sm">
					No results found. Try searching for something else.
				</p>
			)}
			<div className="flex flex-col gap-y-4">
				{
					data.map((result) => (
						<ResultCard key={result.id} data={result} />
					))
				}
			</div>
		</div>
	)
}