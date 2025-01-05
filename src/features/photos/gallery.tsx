import { useState } from "react"

import { OverlaySpinner } from "../../components/Spinner"
import { Photo, PhotoApiSchema } from "./photo"
import { SmallPhoto } from "./small-photo"
import { usePagingData } from "./use-paging-data"

interface PhotoGalleryProps {
	tournamentId?: number
}

export function Gallery({ tournamentId }: PhotoGalleryProps) {
	const [page, setPage] = useState(1)
	const [photos, setPhotos] = useState<Photo[]>([])

	const url = () => {
		if (tournamentId) {
			return `photos/?page=${page}&tournament=${tournamentId}`
		} else {
			return `photos/?page=${page}`
		}
	}
	const { data, status } = usePagingData(url(), PhotoApiSchema)

	if (data?.results && (data?.results?.length ?? 0) * page > photos.length) {
		setPhotos([...photos, ...data.results.map((pic) => new Photo(pic))])
	}

	const handleLoadMore = () => {
		setPage(page + 1)
	}

	return (
		<div>
			<OverlaySpinner loading={status === "pending"} />
			<ul style={{ listStyle: "none" }}>
				{photos.map((pic) => {
					return (
						<li key={pic.id} style={{ display: "inline-block" }}>
							<SmallPhoto photo={pic} />
						</li>
					)
				})}
				{data?.next && (
					<li>
						<button className="btn btn-link" onClick={handleLoadMore}>
							load more...
						</button>
					</li>
				)}
			</ul>
		</div>
	)
}
