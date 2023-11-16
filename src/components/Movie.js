import EditMovie from "./EditMovie";

function Movie(props) {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mb-4">
      <img
        className="block mx-auto h-24  sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="movie-poster"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">{props.year}</p>
        </div>
        <EditMovie/>
      </div>
    </div>
  );
}

export default Movie;
