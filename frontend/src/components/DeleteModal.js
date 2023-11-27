const DeleteModal = ({ movie, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="p-5 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <img
            src={movie.imgURL}
            alt={movie.title}
            className="object-cover w-24 h-24 mb-4 rounded-full"
          />
          <h2 className="mb-4 text-xl font-bold">Delete Movie</h2>
          <p className="mb-4">
            You are about to delete "{movie.title}". Are you sure?
          </p>
          <div className="flex justify-around w-full">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(movie._id)}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
