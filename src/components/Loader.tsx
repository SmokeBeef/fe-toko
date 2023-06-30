import {AiOutlineLoading3Quarters} from "react-icons/ai"

interface prop {
    size: number
    color?: boolean | false
    className?: string
}

function Loader (props: prop) {
    return(
        <div className="flex justify-center">
            <AiOutlineLoading3Quarters  className={`animate-spin  ${props.color && "text-slate-50"} ${props.className}`} size={props.size} />
        </div>
    )
}

export default Loader