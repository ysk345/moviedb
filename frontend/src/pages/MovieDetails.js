import { useParams } from "react-router-dom";

export default function MovieDetails(){
    const params = useParams();
    let movieData = null;

    //database lookup using id
    if(params.id === '001') {
        movieData = {
            name: 'The Lord of the Rings: The Return of the King',
            year: 2003,
            img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"      
        }
    }

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