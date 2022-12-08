import React from "react"
import Layout from "../../../components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {marked} from "marked"

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

export default function Episode({frontmatter, slug, content}: {frontmatter: {title: string; guest: string;}; slug: string; content: string;}) {
    return (
        <Layout title={frontmatter.title + ' - ' + frontmatter.guest} slug={slug}>
            <h1>{frontmatter.title}</h1>

            <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
        </Layout>
    )
}