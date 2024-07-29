import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSeasonDetail, getUniqueMovieData } from '../request/request'
import { FaStar } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Detail = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [season, setSeason] = useState()
    const [seasonNumber, setSeasonNumber] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
            const fetchData = await getUniqueMovieData(id);
            const fetchSeasonData = await getSeasonDetail(id, seasonNumber);
            setSeason(fetchSeasonData)
            setData(fetchData);
        };

        fetchData();
    }, [])
    const handlePrevSeason = () => {
        const newSeasonNumber = seasonNumber - 1
        setSeasonNumber(newSeasonNumber)
        getSeasonDetail(id, newSeasonNumber).then(fetchData => setSeason(fetchData));
    }
    const handleNextSeason = () => {
        const newSeasonNumber = seasonNumber + 1
        setSeasonNumber(newSeasonNumber)
        getSeasonDetail(id, newSeasonNumber).then(fetchData => setSeason(fetchData));

    }
    return (
        <div className='flex flex-col gap-4 justify-center items-center min-h-dvh   text-white py-12 md:py-24 lg:px-32 '>
            {
                data &&
                <div className='grid grid-cols-1 md:grid-cols-10 gap-y-8 md:gap-16 mt-16 mx-4 bg-white text-secondary p-4 md:p-16 rounded-xl'>
                    <div className='col-span-3 h-min'>
                        {
                            data?.Poster !== "N/A" &&
                            <img src={data.Poster} alt="" className='rounded-xl w-full border-2 h-auto shadow-xl' /> ||
                            <div className='rounded-xl w-full text-white font-bold flex justify-center items-center bg-secondary h-96 shadow-xl' >
                                NO IMAGE
                            </div>
                        }
                    </div>
                    <div className='col-span-7 h-min flex flex-col gap-4 '>
                        <div className='flex w-full justify-between items-center'>
                            <h1 className='text-4xl flex flex-col items-start font-bold leading-snug'>
                                {data.Title}
                                <span className='text-xs px-1'>#{data.imdbID}</span>
                            </h1>
                            <div className='flex gap-1 md:gap-4 items-center'>
                                <p className='flex items-center font-bold text-lg gap-1'><FaStar className='text-xl text-primary_hover' />{data.imdbRating}</p>
                                <h2 className='flex items-center text-sm bg-primary text-white rounded-full px-2 md:px-4 py-1 md:py-2 capitalize'>{data.Type}</h2>
                            </div>
                        </div>
                        <div className='flex items-center text-center gap-4 text-sm '>
                            <p >{data.Year}</p>
                            <span className='text-2xl md:text-sm'>/</span>
                            <p>{data.Genre}</p>
                            <span className='text-2xl md:text-sm'>/</span>
                            <p>{data.Runtime}</p>
                            <span className='text-2xl md:text-sm'>/</span>
                            <p>{data.Language}</p>
                        </div>
                        <div>
                            <p className='font-bold  capitalize '>summary:</p>
                            <p className='text-justify'>{data.Plot}</p>
                        </div>
                        <div>
                            <div className='border-y py-4 my-3 border-slate-600'>
                                <div className='flex gap-2 items-center'>
                                    <p className='capitalize font-thin'>Director:</p>
                                    <p className='font-semibold'>{data.Director}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p className='capitalize font-thin'>Writer:</p>
                                    <p className='font-semibold'>{data.Writer}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p className='capitalize font-thin'>Actors:</p>
                                    <p className='font-semibold'>{data.Actors}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center'>
                                {
                                    data.Type === "series" &&
                                    <>
                                        <div className='flex gap-2 items-center capitalize'>
                                            <p >Seasons:</p>
                                            <p className=' font-bold text-lg'>{data.totalSeasons}</p>
                                        </div>
                                        <div className='flex items-center gap-2 text-white font-bold'>
                                            <button className='bg-primary px-4 py-2 rounded-s-full'
                                                disabled={seasonNumber == 1}
                                                onClick={handlePrevSeason}>Prev Season</button>

                                            <p className='font-bold text-xl text-secondary'>{seasonNumber}</p>

                                            <button className='bg-primary px-4 py-2 rounded-e-full '
                                                disabled={seasonNumber >= season?.totalSeasons}
                                                onClick={handleNextSeason}>Next Season</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        {
                            data.Type === "series" &&
                            <>
                                <div className='flex justify-between items-center my-3'>
                                    <p className='font-bold text-xl'>Season {seasonNumber} </p>
                                    <p className='font-bold text-xl'>Episodes {season?.Episodes?.length} </p>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    {
                                        season?.Episodes?.map(s => (
                                            <div key={s.imdbID} className=' text-secondary border-2 border-secondary p-3 rounded-xl'>
                                                <div className='flex justify-between items-center '>
                                                    <p className='text-sm'>S{season.Season}.E{s.Episode}</p>
                                                    <p className='text-xs'>{s.Released.split("-").reverse().join(".")}</p>
                                                </div>
                                                <Link to={`/episode/${id}/${season.Season}/${s.Episode}`} className='hover:text-primary'>
                                                    <div className='flex justify-between items-center gap-2'>
                                                        <p className='font-bold text-lg line-clamp-1 w-11/12'>{s.Title}</p>
                                                        <FaAngleDoubleRight className='text-xl w-1/12  text-primary'  />
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                ||
                <div>Loading...</div>
            }
        </div>
    )
}

export default Detail