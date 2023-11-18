import { useParams } from "react-router-dom";

export default function MovieDetails(){
    const params = useParams();
    let movieData = null;

    return (
        <>
        <h1>Movie Details</h1>
        <p>Movie ID: {params.id}</p>
        {movieData ? (
            <>
            <img src={movieData.img} alt={movieData.name} width="200"/>
            <h2>{movieData.name}{movieData.year}</h2>
            </>
        ) : (<p>Not Found</p>)
        }
        </>
    );
}