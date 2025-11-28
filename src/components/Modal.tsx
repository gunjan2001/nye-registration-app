import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Portal } from "./Portal";

interface IModal {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-9999 flex items-center justify-center
                     bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl 
                       p-6 w-[90%] max-w-md"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
