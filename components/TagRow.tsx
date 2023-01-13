import Tag from "./Tag";

interface TagProps {
  ariaDescribedby?:string,
  className?: string,
  tags: {
      slug: string,
      title: string
    }[]
}

export default function TagRow(props:TagProps){
  return(
    <div className={"flex flex-row flex-wrap mb-4 gap-4 " + props.className} aria-describedby={props.ariaDescribedby}>
      {props.tags.map((tag, key: number)=>(
        <Tag title={tag.title} slug={tag.slug} key={key} />
      ))}
    </div>
  )
}