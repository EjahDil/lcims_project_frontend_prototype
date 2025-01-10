import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
      onClick={onClose} // Clicking outside the modal closes it
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-full max-w-xl max-h-[650px] overflow-x-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent click event from closing modal when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
