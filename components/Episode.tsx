import Link from "next/link"
import Image from "next/image"
import React from "react"

interface EpisodeProps {
  slug: string,
  image: string,
  guest: string,
  placeholderImage: string,
  title: string
}

export default function Episode(props: EpisodeProps){
  return(
    <div className="flex flex-col">
      <Link href={'/episodes/' + props.slug}>
        <div className="bg-dark-1 bg-center bg-cover p-12 mb-4 relative">
          {props.image ?
            <Image
              src={'/ProfilePhotos/' + props.image}
              alt={props.guest}
              width="384"
              height="384"
              placeholder="blur"
              blurDataURL={'/ProfilePhotos/' + props.placeholderImage}
              className="border border-gray-700 mx-auto block drop-shadow-lg"
            />
            : ''}
          <span className="bg-bd-navy-200 text-bd-orange-500 p-2 drop-shadow-md absolute bottom-8 right-8">{props.guest}</span>
        </div>
      </Link>
      <h3 className="text-2xl mb-2">
        <Link href={'/episodes/' + props.slug}>
          {props.title}
        </Link>
      </h3>
      <p className="text-lg font-semibold">
        <Link href={'/episodes/' + props.slug}>
          {props.guest}
        </Link>
      </p>
    </div>
  )
}