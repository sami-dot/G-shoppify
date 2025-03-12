import { createPortal } from "react-dom";
export default function Modal({ onClose, children }) {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed z-10 h-screen w-screen bg-black/60">
        {children}
      </div>
    </>,
    modalRoot
  );
}
