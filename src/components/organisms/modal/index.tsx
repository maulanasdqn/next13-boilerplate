import { FC, Fragment, ReactElement } from "react";
import { createPortal } from "react-dom";
import { TModal } from "./type";
import { IoMdClose } from "react-icons/io";

export const Modal: FC<TModal> = (props): ReactElement => {
  return createPortal(
    <Fragment>
      {props.isOpen && (
        <section className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-gray-200/80 bg-blur z-50 flex justify-center items-center">
          <div className="bg-white w-fit p-4 shadow rounded-lg h-auto">
            <div className="flex justify-between w-full items-center">
              <h1 className="text-base font-medium select-none">{props.title}</h1>
              {props.onClose && (
                <IoMdClose className="cursor-pointer" onClick={props.onClose} size={20} />
              )}
            </div>
            <div
              style={{
                width: props.width + "px",
                height: props.height + "px",
              }}
            >
              {props.children}
            </div>
          </div>
        </section>
      )}
    </Fragment>,
    document.body,
  );
};
