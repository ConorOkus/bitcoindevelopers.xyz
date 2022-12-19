import Episode from "./Episode"
import React from "react"

interface EpisodeGridProps {
  episodes: {
    slug: string,
    image: string,
    guest: string,
    placeholderImage: string,
    title: string
  }[]
}

export default function EpisodeGrid(props: EpisodeGridProps){
  return(
    <div className="grid grid-cols gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      {props.episodes.map((episode)=>(
        <Episode
          slug={episode.slug}
          image={episode.image}
          guest={episode.guest}
          placeholderImage={episode.placeholderImage}
          title={episode.title}
        />
      ))}
    </div>
  )
}