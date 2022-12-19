import React from "react"
import Layout from "../../../components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {marked} from "marked"
import tags from "../../../tags.json"
import TagRow from "../../../components/TagRow"

export async function getStaticPaths(){
    const files = fs.readdirSync(path.join('episodes'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params:{slug}}: {params:{slug: string;}} ){
    const markdownWithMeta = fs.readFileSync(path.join('episodes', slug + '.md'), 'utf-8')
    const {data:frontmatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}

export default function Episode({frontmatter, slug, content}: {frontmatter: {
        tags: any;
        title: string; guest: string; video: string;}; slug: string; content: string;}) {

    let videoId = frontmatter.video.slice(frontmatter.video.indexOf('?v=')+3)
    let foundTags: any[] = []
    for(let i=0; i < tags.length; i++) {
        if(frontmatter.tags.includes(tags[i].slug)) foundTags = [...foundTags, tags[i]]
    }

    return (
        <Layout title={frontmatter.title + ' - ' + frontmatter.guest} slug={slug}>
            <div className="bg-bd-navy-200 relative h-0 w-full pb-[56.25%] overflow-hidden">
                <iframe
                    width="1920"
                    height="1080"
                    src={"https://www.youtube.com/embed/" + videoId}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full absolute top-0 left-0 h-full"
                >
                </iframe>
            </div>

            <div className="p-8 max-w-4xl mx-auto flex flex-col space-y-4">
                <h1 className="text-4xl">{frontmatter.title}</h1>

                <p className="text-2xl">{frontmatter.guest}</p>
                <div className="flex flex-row flex-wrap mb-4" aria-describedby="tags-label">
                    <TagRow tags={foundTags} />
                </div>


                <div
                    className="flex flex-col space-y-4"
                    dangerouslySetInnerHTML={{__html: marked(content)}}
                ></div>
            </div>

        </Layout>
    )
}