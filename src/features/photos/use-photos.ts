import { useMutation, useQuery } from "@tanstack/react-query"

import { apiUrl, getMany, getOne, httpClient } from "../../utilities/HttpClient"
import { Photo, PhotoApiSchema } from "./photo"

export function usePhotos(season: number) {
  const endpoint = `photos/?year=${season}&`
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getMany(endpoint, PhotoApiSchema),
    select: (data) => data.map((photo) => new Photo(photo)),
  })
}

export function useTournamentPhotos(tournamentId: number) {
  const endpoint = `photos/?tournament=${tournamentId}&`
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getMany(endpoint, PhotoApiSchema),
    select: (data) => data.map((photo) => new Photo(photo)),
  })
}

export function usePhoto(photoId: number) {
  const endpoint = `photos/${photoId}/`
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getOne(endpoint, PhotoApiSchema),
    select: (data) => {
      if (data) {
        return new Photo(data)
      }
    },
  })
}

export function useUploadPhoto() {
  return useMutation({
    mutationFn: (formData: FormData) => httpClient(apiUrl(`photos/`), { body: formData }),
  })
}
