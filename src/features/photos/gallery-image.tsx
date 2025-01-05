import { PhotoProps } from "./photo"

export function GalleryImage({ photo }: PhotoProps) {
  return (
    <div>
      <p>{photo.caption}</p>
      <picture>
        <source srcSet={photo.mobileImageUrl()} media="(max-width: 600px)" />
        <source srcSet={photo.webImageUrl()} media="(max-width: 1200px)" />
        <img
          src={photo.imageUrl()}
          alt={photo.caption}
          className="card-img-bottom"
          style={{ width: "100%", maxHeight: "70vh" }}
        />
      </picture>
      <div className="d-flex justify-content-between">
        <span>{photo.year}</span>
      </div>
    </div>
  )
}
