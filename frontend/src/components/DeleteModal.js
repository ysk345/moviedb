const DeleteModal = ({ movie, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <img
            src={movie.imgURL}
            alt={movie.title}
            className="w-24 h-24 object-cover rounded-full mb-4"
          />
          <h2 className="text-xl font-bold mb-4">Delete Movie</h2>
          <p className="mb-4">
            You are about to delete "{movie.title}". Are you sure?
          </p>
          <div className="flex justify-around w-full">
            <button
              onClick={() => onDelete(movie._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
