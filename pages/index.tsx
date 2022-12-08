import Layout from "../components/Layout"
import upcoming from "../upcoming.json";
import Image from "next/image";
import Button from "../components/Button";
import tags from "../tags.json";
import episodes from "../episodes.json";
import React from "react";

export default function Home(){
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
                layout="responsive"
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
                layout="responsive"
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
              <li>
                <Button href={navLink.uri}>{navLink.label}</Button>
              </li>
          ))}
        </ul>
      </div>

      <div className="px-8 pb-16">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between my-8">
          <h2 className="text-4xl mb-4 font-semibold">Past Episodes</h2>

          <div className="flex flex-col space-y-2 mb-4 items-start md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <label className="uppercase font-semibold text-xl" id="tags-label">Filter</label>

            <div className="flex flex-row flex-wrap mb-4" aria-describedby="tags-label">
              {tags.map((tag)=>(
                  <span className="bg-bd-navy-200 text-white dark:bg-white dark:text-bd-navy-200 p-2 rounded mr-2 md:mr-0 md:ml-2 mb-2">
                    {tag.title}
                  </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {episodes.map((episode)=>(
              <div className="flex flex-col">
                <div className="bg-dark-1 bg-center bg-cover p-12 relative">
                  {episode.image ?
                      <Image
                          src={'/ProfilePhoto/' + episode.image}
                          alt={episode.guest}
                          width="384"
                          height="384"
                          placeholder="blur"
                          blurDataURL={'/ProfilePhoto/' + episode.placeholderImage}
                          className="border border-gray-700 mx-auto block drop-shadow-lg"
                      />
                      : ''}
                  <span className="bg-bd-navy-200 text-bd-orange-500 p-2 drop-shadow-md absolute bottom-8 right-8">{episode.guest}</span>
                </div>
                <h3 className="text-2xl">{episode.title}</h3>
                <p className="text-lg font-semibold">{episode.guest}</p>
              </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}