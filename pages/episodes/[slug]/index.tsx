import React from "react"
import Layout from "../../../components/Layout"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {marked} from "marked"
import tags from "../../../tags.json"
import TagRow from "../../../components/TagRow"
import EpisodeGrid from "../../../components/EpisodeGrid"
import Image from "next/image"
import {PlayIcon} from "@heroicons/react/24/solid"
import YouTube from "react-youtube"

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

    let related:any = []

    if(frontmatter.related) {
        frontmatter.related.map((episode: string)=>{
            let relatedMarkdownWithMeta = fs.readFileSync(path.join('episodes', episode + '.md'), 'utf-8')
            let parsed = matter(relatedMarkdownWithMeta)
            parsed.data.slug = episode
            related = [...related, parsed.data]
        })
    }

    return {
        props: {
            frontmatter,
            slug,
            content,
            related
        }
    }
}

export default function Episode({frontmatter, slug, content, related}: {frontmatter: {
        tags: any;
        title: string;
        guest: string;
        video: string;
        related: any;
    }; slug: string; content: string; related: any[];}) {
    const [showVideoPoster, setShowVideoPoster] = React.useState(true)
    const [videoReady, setVideoReady] = React.useState(false)
    const [videoPlayer, setVideoPlayer] = React.useState()

    let videoId:string = ''

    if(frontmatter.video.indexOf('?v=') >= 0) videoId = frontmatter.video.slice(frontmatter.video.indexOf('?v=')+3)
    else if(frontmatter.video.indexOf('.be/') >= 0) videoId = frontmatter.video.slice( frontmatter.video.indexOf('.be/') + 4 )

    let foundTags: any[] = []
    for(let i=0; i < tags.length; i++) {
        if(frontmatter.tags.includes(tags[i].slug)) foundTags = [...foundTags, tags[i]]
    }

    return (
        <Layout title={frontmatter.title + ' - ' + frontmatter.guest} slug={slug}>
            <div
              className="bg-bd-navy-200 relative h-0 w-full pb-[56.25%] overflow-hidden cursor-pointer"

            >
                <YouTube
                    videoId={videoId}
                    className="youtube"
                    loading="eager"
                    onReady={(e)=>{setVideoReady(true); setVideoPlayer(e.target); console.log(videoPlayer) }}
                />

                {showVideoPoster ?
                <div
                  className={"video-preview absolute top-0 left-0 z-10 w-full h-full" + (videoReady ? ' ready' : '')}
                  onClick={()=>{if(videoPlayer){ setShowVideoPoster(false); // @ts-ignore
                      videoPlayer.playVideo(); }}}
                >
                    <Image
                      src={'/EpisodeImages/' + slug + '.jpg'}
                      alt={''}
                      width="1920"
                      height="1080"
                      className="absolute top-0 left-0 z-10 transition-all"
                      placeholder="blur"
                      blurDataURL={'/EpisodeImages/' + slug + '@32px.jpg'}
                    />
                    <div className={videoReady && showVideoPoster ? "icon-container w-full h-full flex items-center justify-center absolute top-0 left-0 z-20 transition-all" : "hidden"}>
                        <PlayIcon className="w-64 h-64 text-white cursor-pointer opacity-20 pointer-events-none" />
                    </div>
                    <div className={videoReady ? 'hidden' : "flex items-center justify-center absolute top-0 left-0 z-20 w-full h-full bg-black/50"}>
                        <div className="relative w-32 h-32">
                            <svg
                              width="100"
                              height="100"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute animate-spin w-full h-auto"
                            >
                            <mask id="path-1-inside-1_1230_9737" fill="white">
                                <path d="M100 50C100 43.4339 98.7067 36.9321 96.194 30.8658C93.6812 24.7995 89.9983 19.2876 85.3553 14.6447C80.7124 10.0017 75.2004 6.31876 69.1342 3.80602C63.0679 1.29329 56.5661 -2.87013e-07 50 0C43.4339 2.87013e-07 36.9321 1.29329 30.8658 3.80602C24.7995 6.31876 19.2876 10.0017 14.6447 14.6447C10.0017 19.2876 6.31876 24.7996 3.80602 30.8658C1.29329 36.9321 -5.74026e-07 43.4339 0 50L20 50C20 46.0603 20.776 42.1593 22.2836 38.5195C23.7913 34.8797 26.001 31.5726 28.7868 28.7868C31.5726 26.001 34.8797 23.7913 38.5195 22.2836C42.1593 20.776 46.0603 20 50 20C53.9397 20 57.8407 20.776 61.4805 22.2836C65.1203 23.7913 68.4274 26.001 71.2132 28.7868C73.999 31.5726 76.2087 34.8797 77.7164 38.5195C79.224 42.1593 80 46.0603 80 50H100Z"/>
                            </mask>
                            <path d="M100 50C100 43.4339 98.7067 36.9321 96.194 30.8658C93.6812 24.7995 89.9983 19.2876 85.3553 14.6447C80.7124 10.0017 75.2004 6.31876 69.1342 3.80602C63.0679 1.29329 56.5661 -2.87013e-07 50 0C43.4339 2.87013e-07 36.9321 1.29329 30.8658 3.80602C24.7995 6.31876 19.2876 10.0017 14.6447 14.6447C10.0017 19.2876 6.31876 24.7996 3.80602 30.8658C1.29329 36.9321 -5.74026e-07 43.4339 0 50L20 50C20 46.0603 20.776 42.1593 22.2836 38.5195C23.7913 34.8797 26.001 31.5726 28.7868 28.7868C31.5726 26.001 34.8797 23.7913 38.5195 22.2836C42.1593 20.776 46.0603 20 50 20C53.9397 20 57.8407 20.776 61.4805 22.2836C65.1203 23.7913 68.4274 26.001 71.2132 28.7868C73.999 31.5726 76.2087 34.8797 77.7164 38.5195C79.224 42.1593 80 46.0603 80 50H100Z" stroke="white" strokeOpacity="0.5" strokeWidth="40" mask="url(#path-1-inside-1_1230_9737)"/>
                        </svg>
                            <svg
                              width="100"
                              height="100"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute animate-spin-slow w-full h-auto"
                            >
                            <mask id="path-1-inside-1_1230_9736" fill="white">
                                <path d="M100 50C100 59.8891 97.0676 69.5561 91.5735 77.7785C86.0794 86.001 78.2705 92.4096 69.1342 96.194C59.9979 99.9784 49.9445 100.969 40.2455 99.0393C30.5464 97.11 21.6373 92.348 14.6447 85.3553C7.65204 78.3627 2.89 69.4536 0.960736 59.7545C-0.968525 50.0555 0.0216418 40.0021 3.80602 30.8658C7.59041 21.7295 13.999 13.9206 22.2215 8.42652C30.4439 2.93245 40.1109 -1.17926e-07 50 0L50 20C44.0666 20 38.2664 21.7595 33.3329 25.0559C28.3994 28.3524 24.5542 33.0377 22.2836 38.5195C20.013 44.0013 19.4189 50.0333 20.5764 55.8527C21.734 61.6721 24.5912 67.0176 28.7868 71.2132C32.9824 75.4088 38.3279 78.266 44.1473 79.4236C49.9667 80.5811 55.9987 79.987 61.4805 77.7164C66.9623 75.4458 71.6476 71.6006 74.9441 66.6671C78.2405 61.7336 80 55.9334 80 50H100Z"/>
                            </mask>
                            <path d="M100 50C100 59.8891 97.0676 69.5561 91.5735 77.7785C86.0794 86.001 78.2705 92.4096 69.1342 96.194C59.9979 99.9784 49.9445 100.969 40.2455 99.0393C30.5464 97.11 21.6373 92.348 14.6447 85.3553C7.65204 78.3627 2.89 69.4536 0.960736 59.7545C-0.968525 50.0555 0.0216418 40.0021 3.80602 30.8658C7.59041 21.7295 13.999 13.9206 22.2215 8.42652C30.4439 2.93245 40.1109 -1.17926e-07 50 0L50 20C44.0666 20 38.2664 21.7595 33.3329 25.0559C28.3994 28.3524 24.5542 33.0377 22.2836 38.5195C20.013 44.0013 19.4189 50.0333 20.5764 55.8527C21.734 61.6721 24.5912 67.0176 28.7868 71.2132C32.9824 75.4088 38.3279 78.266 44.1473 79.4236C49.9667 80.5811 55.9987 79.987 61.4805 77.7164C66.9623 75.4458 71.6476 71.6006 74.9441 66.6671C78.2405 61.7336 80 55.9334 80 50H100Z" stroke="white" strokeOpacity="0.25" strokeWidth="40" mask="url(#path-1-inside-1_1230_9736)"/>
                        </svg>
                        </div>
                    </div>
                </div>
                : ``}
            </div>

            <div className="p-8 max-w-4xl mx-auto flex flex-col space-y-4">
                <h1 className="text-4xl">{frontmatter.title}</h1>

                <p className="text-2xl">{frontmatter.guest}</p>
                <div className="flex flex-row flex-wrap mb-4" aria-describedby="tags-label">
                    <TagRow tags={foundTags} />
                </div>

                <div
                    className="flex flex-col space-y-4 episode-notes"
                    dangerouslySetInnerHTML={{__html: marked(content)}}
                ></div>

            </div>

            <div className="px-8 pb-24">
                {related.length > 0 ?
                    <>
                        <h2 className="text-2xl mb-4">Related episodes</h2>
                        <EpisodeGrid episodes={related} />
                    </>
                : ``}
            </div>
        </Layout>
    )
}