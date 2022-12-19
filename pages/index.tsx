import Layout from "../components/Layout"
import upcoming from "../upcoming.json"
import Image from "next/image"
import Button from "../components/Button"
import tags from "../tags.json"
import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import TagRow from "../components/TagRow"
import EpisodeGrid from "../components/EpisodeGrid"

export async function getStaticProps(){
  const files = fs.readdirSync(path.join('episodes'))

  const episodes = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('episodes', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)

    return{slug, frontmatter}
  })

  return {
    props: {
      episodes: episodes
    }
  }
}

export default function Home({episodes}: {episodes: Array<any>;}){
  const navLinks = [
    {
      label: 'Twitch',
      uri: 'https://www.twitch.tv/bitcoindevelopers'
    },
    {
      label: 'Youtube',
      uri: 'https://www.youtube.com/channel/UCUq_ZdezVWKPvkWRicAYxLA'
    },
  ]

  const formattedEpisodes = ()=>{
    let sorted = episodes.sort((a,b) => {
      return b.frontmatter.number - a.frontmatter.number
    })

    let formatted: any[] = []

    for(let i=0; i < sorted.length; i++) {
      formatted = [...formatted, {
        slug: sorted[i].slug,
        title: sorted[i].frontmatter.title,
        guest: sorted[i].frontmatter.guest,
        image: sorted[i].frontmatter.image,
        placeholderImage: sorted[i].frontmatter.placeholderImage,
      }]
    }

    return formatted
  }

  return (
    <Layout>
      <div className="bg-dark-1 bg-center bg-cover p-8 lg:grid lg:grid-cols-8 lg:gap-8">
        <div className="lg:w-full lg:col-span-5">
          <div className="bg-bd-navy-100 text-white p-8 flex flex-col space-y-2 drop-shadow-lg mb-8 md:space-y-4 lg:w-full">
            <p className="uppercase text-bd-orange-500 text-xl md:text-3xl font-semibold">
              Up Next
            </p>
            <p className="leading-snug text-xl md:text-4xl md:leading-snug xl:text-5xl xl:leading-snug font-semibold">
              {upcoming.title}
            </p>
            <p className="text-gray-400 text-xl font-light md:text-3xl lg:text-4xl">
              January 3, 2009, 18:30 UTC
            </p>
          </div>
        </div>

        <div className="mb-8 w-3/5 ml-auto lg:w-full lg:ml-0 lg:col-span-3">
          <div className="relative">
            <Image
                src={'/ProfilePhotos/' + upcoming.guest.image}
                alt={upcoming.guest.name}
                placeholder="blur"
                blurDataURL={'/ProfilePhotos/' + upcoming.guest.placeholderImage}
                width="384"
                height="384"
                className="drop-shadow-lg"
            />
            <span className="bg-bd-navy-200 text-bd-orange-500 p-4 absolute -bottom-6 -right-6 text-lg drop-shadow-lg lg:text-3xl">
                {upcoming.guest.name}
              </span>
          </div>
        </div>

        <div className="mb-8 w-3/5 md:m-0 md:w-1/3 lg:col-span-2 lg:col-start-4 lg:w-full">
          <div className="relative">
            <Image
                src={'/ProfilePhotos/' + upcoming.host.image}
                alt={upcoming.host.name}
                placeholder="blur"
                blurDataURL={'/ProfilePhotos/' + upcoming.host.placeholderImage}
                width="384"
                height="384"
                className="drop-shadow-lg"
            />
            <span className="bg-bd-navy-200 text-bd-orange-500 p-4 absolute -bottom-6 -right-6 text-lg drop-shadow-lg lg:text-3xl">
                {upcoming.host.name}
              </span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col space-y-8">
        <p className="text-center text-lg md:text-2xl lg:text-3xl xl:text-4xl max-w-4xl mx-auto">
          Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals.
        </p>

        <ul className="flex flex-row space-x-4 mx-auto max-w-4xl mx-auto items-center justify-center">
          {navLinks.map((navLink, key)=>(
              <li key={key}>
                <Button href={navLink.uri}>{navLink.label}</Button>
              </li>
          ))}
        </ul>
      </div>

      <div className="px-8 pb-16">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between my-8">
          <h2 className="text-4xl mb-4 font-semibold">Past Episodes</h2>

          <div className="flex flex-col space-y-2 mb-4 items-start md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <label className="uppercase font-semibold text-xl md:mr-2" id="tags-label">Filter</label>
            <TagRow tags={tags} ariaDescribedby="tags-label" className="md:ml-4" />
          </div>
        </div>

        <EpisodeGrid episodes={formattedEpisodes()} />
      </div>
    </Layout>
  )
}