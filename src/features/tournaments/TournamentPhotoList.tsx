import React, { useState } from "react"

import LoadingContainer from "components/LoadingContainer"
import { useGetPhotosQuery } from "features/gallery/galleryApi"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
// import Carousel, { Modal, ModalGateway } from "react-images";
import { useParams } from "react-router-dom"

import { MpgaPhoto } from "../../models/Documents"
import GalleryMenu from "../gallery/GalleryMenu"
import PhotoGallery from "../gallery/PhotoGallery"
import { TournamentDetailProps } from "./tournamentPropTypes"

const TournamentPhotoList: React.FC<TournamentDetailProps> = (props) => {
  const { tournament } = props

  const { year } = useParams()
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const { photos, isLoading } = useGetPhotosQuery(
    { tournamentId: tournament.id, year: year ? +year : undefined },
    {
      selectFromResult: ({ data }) => ({
        photos: data?.map((d) => new MpgaPhoto(d)) || [],
        isLoading,
      }),
    },
  )

  const toggleLightbox = (index: number) => {
    setLightboxIsOpen(!lightboxIsOpen)
    // setSelectedIndex(index);
  }

  // const imageList = (photos: MpgaPhoto[]) => {
  //   return photos.map((p: MpgaPhoto) => {
  //     return {
  //       caption: p.caption,
  //       source: {
  //         regular: p.imageUrl,
  //         thumbnail: p.thumbnailUrl,
  //         fullscreen: p.rawImage,
  //         download: p.rawImage,
  //       },
  //     };
  //   });
  // };

  return (
    <div>
      <h3 className="text-primary">
        {year} {tournament.name} Gallery
      </h3>
      <Row>
        <Col>
          <GalleryMenu currentYear={year!} />
        </Col>
      </Row>
      <LoadingContainer loading={isLoading}>
        <PhotoGallery photos={photos} onSelect={(idx) => toggleLightbox(idx)} />
        {/* <ModalGateway>
          {lightboxIsOpen ? (
            <Modal onClose={() => toggleLightbox(selectedIndex)}>
              <Carousel views={imageList(photos)} currentIndex={selectedIndex} />
            </Modal>
          ) : null}
        </ModalGateway> */}
      </LoadingContainer>
    </div>
  )
}

export default TournamentPhotoList
