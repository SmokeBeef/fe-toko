import {AiOutlineLoading3Quarters} from "react-icons/ai"



function LoaderScreen () {
    return(
        <div className="flex justify-center">
            <AiOutlineLoading3Quarters  className={`animate-spin absolute text-slate-50`} size={50} />
        </div>
    )
}

export default LoaderScreen