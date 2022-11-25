import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import BdIcon from '../components/BdIcon'
import BdLogotype from '../components/BdLogotype'
import {MenuIcon, SunIcon, MoonIcon} from "@bitcoin-design/bitcoin-icons-react/filled"
import episodes from "../episodes.json"
import tags from "../tags.json"

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
        
          <div>
            Hero Block
          </div>

          <p>
            Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals. 
          </p>

          <p>Twitch</p>
          <p>YouTube</p>

          <div>
            <p>
              Bitcoin ipsum dolor sit amet. Hashrate private key, cryptocurrency double-spend problem stacking sats block height Merkle Tree! Stacking sats proof-of-work address digital signature proof-of-work hashrate hash, proof-of-work! Whitepaper block height electronic cash UTXO blockchain Merkle Tree digital signature Satoshi Nakamoto.
            </p>
            
            <p>
              Bitcoin Improvement Proposal, stacking sats consensus block height full node, nonce satoshis cryptocurrency. Blocksize, hard fork nonce timestamp server address, timestamp server genesis block! Mempool bitcoin electronic cash, proof-of-work mining cryptocurrency mining. Consensus electronic cash.
            </p>

            <p>
              Electronic cash stacking sats cryptocurrency mining mempool segwit, mining Bitcoin Improvement Proposal block reward. Halvening whitepaper digital signature address hash UTXO satoshis, double-spend problem wallet. Transaction mining Bitcoin Improvement Proposal blockchain, address, bitcoin satoshis genesis block. Blockchain, outputs hashrate, key pair Bitcoin Improvement Proposal transaction, blocksize.
            </p>

            <p>
              Public key Satoshi Nakamoto soft fork whitepaper Merkle Tree whitepaper, satoshis SHA-256. Address segwit UTXO peer-to-peer whitepaper public key, hard fork! Cryptocurrency peer-to-peer blockchain Merkle Tree genesis block difficulty consensus Satoshi Nakamoto UTXO.
            </p>

            <p>
              Bitcoin Improvement Proposal difficulty whitepaper nonce UTXO SHA-256 private key SHA-256 transaction. Mining digital signature soft fork cryptocurrency, key pair public key private key full node. Address mempool Bitcoin Improvement Proposal whitepaper, proof-of-work miner segwit miner.
            </p>





          </div>
          
          <div className="px-8">
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
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
