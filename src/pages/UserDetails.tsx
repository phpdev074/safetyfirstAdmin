import React from 'react';

interface ModalData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    image: string;
    status: boolean;
    role: 'user' | 'advisor';
    createdAt: string;
    updatedAt: string;
}

interface ModalProps {
    isModalOpen: boolean;
    modalData: ModalData | null;
    closeModal: () => void;
}

const UserDetails: React.FC<ModalProps> = ({ isModalOpen, modalData, closeModal }) => {
    if (!isModalOpen || !modalData) return null; // Don't render anything if modal is not open or data is null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-96 p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    onClick={closeModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Scrollable Header */}
                <div className="max-h-20 overflow-y-auto mb-4">
                    <h3 className="text-2xl font-semibold text-center">
                        {modalData.role === 'user' ? 'User Information' : 'Advisor Information'}
                    </h3>
                </div>

                {/* Displaying Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={modalData.image || '/path/to/dummy-image.jpg'} // Fallback image
                        alt={modalData.name || 'User/Advisor'} // Fallback alt text
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>

                <div className="mb-6">
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Name:</strong> {modalData.name}
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Email:</strong> {modalData.email}
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Phone:</strong> {modalData.phone}
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Status:</strong> {modalData.status ? 'Active' : 'Inactive'}
                    </p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                    >
                        Close Modal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
