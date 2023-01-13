interface TwitchStreamProps {
  src: string
}

export default function TwitchStream(props:TwitchStreamProps){
  return(
    <div className="relative h-0 w-full pb-[56.25%] overflow-hidden">
      <iframe
        src={props.src}
        frameBorder="0"
        allowFullScreen={true}
        scrolling="no"
        height="1080"
        width="1920"
        className="w-full absolute top-0 left-0 h-full"
      ></iframe>
    </div>
  )
}