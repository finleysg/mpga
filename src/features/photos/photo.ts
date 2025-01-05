import { z } from "zod"

import Constants from "../../app-constants"
import { ITag } from "../../models/Documents"

const PhotoTagSchema = z.object({
  id: z.number(),
  tag: z.string(),
})

export const PhotoApiSchema = z.object({
  id: z.number(),
  year: z.number(),
  caption: z.string().nullish(),
  mobile_url: z.string(),
  web_url: z.string(),
  image_url: z.string(),
  raw_image: z.string(),
  tournament: z.number().nullish(),
  photo_type: z.string(),
  created_by: z.string(),
  last_update: z.coerce.date(),
  tags: z.array(PhotoTagSchema).nullish(),
})

export type PhotoData = z.infer<typeof PhotoApiSchema>

export class Photo {
  id: number
  year: number
  caption: string | undefined
  rawMobileUrl: string
  rawWebUrl: string
  rawImageUrl: string
  tournament: number | undefined
  photoType: string
  createdBy: string
  lastUpdate: Date
  tags: ITag[]

  constructor(data: PhotoData) {
    this.id = data.id
    this.year = data.year
    this.caption = data.caption ?? ""
    this.rawMobileUrl = data.mobile_url
    this.rawWebUrl = data.web_url
    this.rawImageUrl = data.image_url
    this.tournament = data.tournament ?? 0
    this.photoType = data.photo_type
    this.createdBy = data.created_by
    this.lastUpdate = data.last_update
    this.tags = data.tags?.map((t) => t as ITag) ?? []
  }

  static getPagedPhotosUrl(tournament: number | undefined) {
    if (tournament) {
      return `photos/?page=1&tournament=${tournament}`
    } else {
      return "photos/?page=1"
    }
  }

  imageUrl() {
    if (this.rawImageUrl.startsWith("http")) {
      return this.rawImageUrl // production (from Amazon storage)
    }
    return `${Constants.ServerUrl}${this.rawImageUrl}`
  }

  webImageUrl() {
    if (this.rawWebUrl.startsWith("http")) {
      return this.rawWebUrl // production (from Amazon storage)
    }
    return `${Constants.ServerUrl}${this.rawWebUrl}`
  }

  mobileImageUrl() {
    if (this.rawMobileUrl.startsWith("http")) {
      return this.rawMobileUrl // production (from Amazon storage)
    }
    return `${Constants.ServerUrl}${this.rawMobileUrl}`
  }
}

export interface PhotoProps {
  photo: Photo
}
