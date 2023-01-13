import { ReactNode } from "react"

interface ButtonProps {
    href: string,
    children: ReactNode,
    className?: string
}

const Button = (props:ButtonProps) => {
    let className = "bg-bd-orange-500 text-bd-navy-200 px-3 py-2.5 text-2xl"
    if(props.className) className += " " + props.className

    if(props.href){
        return(
            <a href={props.href} className={className}>{props.children}</a>
        )
    } else {
        return(
            <button className={className}>{props.children}</button>
        )
    }
}

export default Button