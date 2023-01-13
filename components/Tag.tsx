import React from "react"
import Link from "next/link"

interface TagProps {
  title: string,
  slug: string
}

export default function Tag(props:TagProps){
  return(
    <Link href={'/tags/' + props.slug} className="bg-bd-navy-200 text-white dark:bg-white dark:text-bd-navy-200 p-2 rounded inline hover:bg-bd-orange-400 hover:drop-shadow-lg">
      {props.title}
    </Link>
  )
}