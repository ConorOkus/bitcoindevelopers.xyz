import Layout from "../../../components/Layout"
import tags from "../../../tags.json"
import {useRouter} from "next/router"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import EpisodeGrid from "../../../components/EpisodeGrid"

export async function getStaticPaths(){
  const paths = tags.map(tag => ({
    params: {
      slug: tag.slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(){
  const files = fs.readdirSync(path.join('episodes'))

  const episodes = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('episodes', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)

    return{slug, frontmatter}
  })

  const formattedEpisodes = ()=>{
    let formatted: any[] = []

    for(let i=0; i < episodes.length; i++) {
      formatted = [...formatted, {
        slug: episodes[i].slug,
        title: episodes[i].frontmatter.title,
        guest: episodes[i].frontmatter.guest,
        image: episodes[i].frontmatter.image,
        placeholderImage: episodes[i].frontmatter.placeholderImage,
        tags: episodes[i].frontmatter.tags
      }]
    }

    return formatted
  }

  return {
    props: {
      episodes: formattedEpisodes()
    }
  }
}

export default function TagPage({episodes}: {episodes: Array<any>;}){
  const router = useRouter()
  const {slug} = router.query

  const getTagInfo = (tags: {slug: string, title: string}[], slug: string)=>{
    for(let i =0; i < tags.length; i++) {
      if(tags[i].slug === slug) return tags[i]
    }
    return {title: 'Tag not found', slug}
  }

  const tag = getTagInfo(tags, slug as string)

  const getTagEpisodes = (episodes: any[])=>{
    let tagEpisodes: any[] = []
    for(let i=0; i < episodes.length; i++) {
      if(episodes[i].tags.includes(tag.slug)) {
        tagEpisodes = [...tagEpisodes, episodes[i]]
      }
    }
    return tagEpisodes
  }

  const tagEpisodes = getTagEpisodes(episodes)

  return(
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl mb-8">
          {tag.title} episodes
        </h1>

        <EpisodeGrid episodes={tagEpisodes} />
      </div>
    </Layout>
  )
}