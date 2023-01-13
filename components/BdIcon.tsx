interface BdIconProps {
    className?: string
}

const BdIcon = (props:BdIconProps)=> {
   return(
        <span className={props.className}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M42.5623 9.17036L34.3919 1V17.3407L42.5623 9.17036Z" fill="#FF9500"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.6911 10.5543L6 28.2454L23.6911 45.9872V10.5543Z" fill="#FF9500"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M25.0751 9.17037L33.2455 17.3407V1L25.0751 9.17037Z" fill="#FF9500"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M24.8376 10.5543V46.0037L42.5623 28.279L24.8376 10.5543Z" fill="#FF9500"/>
            </svg>
        </span>
   ) 
    
}

export default BdIcon