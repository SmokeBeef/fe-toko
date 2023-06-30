import React from 'react'
import { CgCloseO } from "react-icons/cg"
interface prop {
    isVisible: boolean,
    onClose: Function,
    children: React.ReactNode
}

const Modal = (props: prop) => {
    return props.isVisible ? (
        <div className="font-Poppins fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="px-5 w-[600px] flex flex-col">
            <div className="bg-white rounded-lg p-5">
              <div className="flex justify-end">
                <button
                  onClick={() => props.onClose()}
                  className="text-slate-600 hover:text-slate-800 p-2 text-xl place-self-end"
                >
                  <CgCloseO size={25} />
                </button>
              </div>
              {props.children}
            </div>
          </div>
        </div>
      ) : (
        ""
      );
}

export default Modal
