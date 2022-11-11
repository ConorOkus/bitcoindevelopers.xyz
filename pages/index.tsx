import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false)

  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false)

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

  const navLinks = [
    {
      label: 'Twitch',
      uri: ''
    },
    {
      label: 'Meetup',
      uri: ''
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
        <header>
          Bitcoin Developers

          <button onClick={toggleDarkMode}>Dark Mode</button>

          <ul>
            {navLinks.map((navLink, key)=>(
              <li>
                <a href={navLink.uri}>{navLink.label}</a>
              </li>
            ))}
          </ul>
        </header>

        <div>
          Hero Block
        </div>

        <p>
          Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals. 
        </p>

        <p>Twitch</p>
        <p>YouTube</p>

        <h2>Past Episodes</h2>

        <label>Filter</label>

        <div>
          Filter tags go here
        </div>

        <p>
          Episodes block goes here
        </p>

        <p>
          See more
        </p>
      </main>
    </div>
  )
}
