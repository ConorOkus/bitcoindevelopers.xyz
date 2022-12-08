import Head from 'next/head'
import React, {ReactNode} from 'react'
import BdIcon from '../components/BdIcon'
import BdLogotype from '../components/BdLogotype'
import {MenuIcon, SunIcon, MoonIcon} from "@bitcoin-design/bitcoin-icons-react/filled"
import Link from "next/link";

interface LayoutProps {
    title?: string,
    children: ReactNode,
    slug?: string
}

export default function Layout(props:LayoutProps) {
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
                <title>{props.title ? props.title + " | " : ""}Bitcoin Developers</title>
                <meta name="description" content="Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <main className="w-full">
                <div className="container max-w-screen-xl mx-auto bg-white dark:bg-bd-navy-200 drop-shadow-2xl min-h-screen">
                    <div
                        onClick={toggleMenu}
                        className={(menuHidden ? 'opacity-0 pointer-events-none ' : 'opacity-50 pointer-events-auto ') + 'bg-neutral-900 z-[49] w-full h-full fixed transition-opacity duration-300 md:hidden'}
                    ></div>

                    <header className="bg-white dark:bg-bd-navy-200 sticky top-0 z-50 drop-shadow-lg flex flex-col md:flex-row md:justify-between">
                        <div className="flex flex-row p-4 md:pr-0 justify-between w-full relative bg-white dark:bg-bd-navy-200 z-[51] grow-1">
                            <div className="flex flex-row items-center text-navy-200 dark:text-white">
                                <Link href="/" className="flex flex-row space-x-2 items-center">
                                    <BdIcon className="w-8" />
                                    <BdLogotype className="max-sm:hidden" />
                                </Link>
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
                                <ul className="flex flex-col md:flex-row font-semibold">
                                    {navLinks.map((navLink, key)=>(
                                        <li key={key}>
                                            <a href={navLink.uri} className="p-4 text-lg md:text-base block">{navLink.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </header>

                    {props.children}
                </div>
            </main>
        </div>
    )
}
