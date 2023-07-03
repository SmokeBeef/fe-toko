import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoaderScreen() {
  return (
    <div className="  font-Poppins fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="px-5 w-[600px] flex flex-col">
        
        
            <div className="flex justify-center items-center bg-opacity-25 backdrop-blur-sm">
              <AiOutlineLoading3Quarters
                className={`z-10  animate-spin absolute mx-auto left-0 right-0 text-center text-gray-900`}
                size={50}
              />
        </div>
      </div>
    </div>
  );
}

export default LoaderScreen;
