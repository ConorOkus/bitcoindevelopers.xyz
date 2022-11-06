import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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
    <div className={styles.container}>
      <Head>
        <title>Bitcoin Developers</title>
        <meta name="description" content="Bitcoin Developers is a Twitch stream focused on helping you learn bitcoin and lightning development from industry professionals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          Bitcoin Developers
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
