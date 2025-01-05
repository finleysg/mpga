import { useParams } from "react-router-dom"

import { OverlaySpinner } from "../components/Spinner"
import { GalleryImage } from "../features/photos/gallery-image"
import { usePhoto } from "../features/photos/use-photos"

export function GalleryImagePage() {
	const { id } = useParams()
	const { data: pic, status } = usePhoto(id ? +id : 0)

	return (
		<div className="content__inner">
			<OverlaySpinner loading={status === "pending"} />
			{pic && <GalleryImage photo={pic} />}
		</div>
	)
}
