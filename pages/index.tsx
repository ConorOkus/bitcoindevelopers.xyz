import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import BdIcon from '../components/BdIcon'
import BdLogotype from '../components/BdLogotype'
import {MenuIcon, SunIcon, MoonIcon} from "@bitcoin-design/bitcoin-icons-react/filled"
import episodes from "../episodes.json"
import tags from "../tags.json"
import upcoming from "../upcoming.json"
import Button from '../components/Button'
import { kMaxLength } from 'buffer'

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false)
  const [menuHidden, setMenuHidden] = React.useState(true)

  const applyColorMode = ()=> {
    if(prefersDarkMode && localStorage.darkMode === '0') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
    else if(prefersDarkMode || localStorage.darkMode === '1') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }

  React.useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme: dark').matches) setPrefersDarkMode(true)
    applyColorMode()
  }, [prefersDarkMode])

  const toggleDarkMode = () => {
    if(localStorage.darkMode === '1') {
      setDarkMode(false)
      localStorage.darkMode = '0'
      document.documentElement.classList.remove('dark')
    }
    else if(localStorage.darkMode === '0') {
      setDarkMode(true)
      localStorage.darkMode = '1'
      document.documentElement.classList.add('dark')
    }
    else if(prefersDarkMode) {  
      setDarkMode(false)
      localStorage.darkMode = '0'
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleMenu = ()=>{
    setMenuHidden(prevState => !prevState)
  }

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
    <div>
      <Head>
        <title>Bitcoin Developers</title>
        <meta name="description" content="Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <div className="container max-w-screen-xl mx-auto bg-white dark:bg-bd-navy-200 drop-shadow-2xl min-h-screen">
          <div
            onClick={toggleMenu}
            className={(menuHidden ? 'opacity-0 pointer-events-none ' : 'opacity-50 pointer-events-auto ') + 'bg-neutral-900 z-[49] w-full h-full fixed transition-opacity duration-300 md:hidden'}
          ></div>

          <header className="bg-white dark:bg-bd-navy-200 sticky top-0 z-50 drop-shadow-lg flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-row p-4 md:pr-0 justify-between w-full relative bg-white dark:bg-bd-navy-200 z-[51] grow-1">
              <div className="flex flex-row space-x-2 items-center text-navy-200 dark:text-white">
                <BdIcon className="w-8" />
                <BdLogotype className="max-sm:hidden" />
              </div>

              <h1 className="sr-only">
                Bitcoin Developers
              </h1>

              <div className="flex flex-row items-center justify-center space-x-2">
                <button onClick={toggleDarkMode} className="p-4">
                  <span className="sr-only">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                </button>

                <button onClick={toggleMenu} className="md:hidden">
                  <span className="sr-only">
                    Menu
                  </span>
                  <MenuIcon className="w-8 h-8" />
                </button>
              </div>
            </div>
            
            <div className="relative grow-1">
              <nav className={(menuHidden ? 'max-md:-top-48 max-md:pointer-events-none max-md:opacity-0 ' : 'opacity-100 top-0 ') + 'w-full max-md:bg-white max-md:dark:bg-bd-navy-200 absolute z-50 p-4 flex flex-col space-y-4 items-center transition-all duration-300 md:relative'}>
                <ul className="flex flex-col md:flex-row">
                  {navLinks.map((navLink, key)=>(
                    <li key={key}>
                      <a href={navLink.uri} className="p-4 text-lg md:text-base block">{navLink.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
        
          <div className="bg-dark-1 bg-center bg-cover p-8 lg:grid lg:grid-cols-8 lg:gap-8">
            <div className="lg:w-full lg:col-span-5">
              <div className="bg-bd-navy-100 text-white p-8 flex flex-col space-y-2 drop-shadow-lg mb-8 md:space-y-4 lg:w-full">
                <p className="uppercase text-bd-orange-500 text-xl md:text-3xl">
                  Up Next
                </p>
                <p className="text-xl md:text-4xl xl:text-5xl">
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
              <h2 className="text-2xl mb-4">Past Episodes</h2>
              
              <div className="flex flex-col space-y-2 mb-4 items-start md:flex-row md:space-y-0 md:space-x-2 md:items-center">
                <label className="uppercase" id="tags-label">Filter</label>

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
        </div>
      </main>
    </div>
  )
}
