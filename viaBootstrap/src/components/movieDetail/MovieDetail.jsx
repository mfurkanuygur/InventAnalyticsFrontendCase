import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUniqueMovieData } from '../../requests/request'

const MovieDetail = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUniqueMovieData(id);
            setDetail(data);
        };
        fetchData();

    }, [])


    return (
        <div>{id}
            <img src={detail?.Poster} alt={detail?.Title} />
            <h1> {detail?.Title}</h1>
            <p>{detail?.imdbRating}</p>
            <p>{detail?.imdbVotes}</p>
            <h1> {detail?.Type}</h1>
            <h1> {detail?.totalSeasons}</h1>
            <h4>{detail?.Year}</h4>
            <h5>{detail?.Released}</h5>
            <h5>{detail?.Language}</h5>
            <p>{detail?.Runtime}</p>
            <p>{detail?.Genre}</p>
            <p>{detail?.Director}</p>
            <p>{detail?.Writer}</p>
            <p>{detail?.Actors}</p>
            <p>{detail?.Plot}</p>

            {detail?.totalSeasons &&
                <div> sezon</div>}
        </div>
    )
}

export default MovieDetail