import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSeasonDetail, getUniqueMovieData } from '../request/request'
import { FaStar } from "react-icons/fa";
const Detail = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [season, setSeason] = useState()
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [open, setOpen] = useState(false)
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
        <div className='flex flex-col gap-4 justify-center items-center min-h-dvh bg-slate-800   p-8'>
            {
                data &&
                <div className='grid grid-cols-1 md:grid-cols-3  gap-4'>
                    <div className='col-span-1 flex justify-center items-start  w-full'>
                        <img src={data.Poster} alt="" className=' rounded-xl bg-gray-600 w-full min-w-64 max-w-80 h-auto min-h-96' />
                    </div>
                    <div className='col-span-2 flex flex-col gap-2 min-h-dvh'>
                        <div className='flex gap-4 items-center'>
                            <h2 className='flex items-center text-sm  text-slate-300 capitalize'>{data.Type}</h2>
                            <p className='flex items-center font-bold text-lg gap-2'><FaStar />{data.imdbRating}</p>
                        </div>
                        <h1 className='text-4xl font-bold leading-snug'>{data.Title}</h1>
                        <div className='flex items-center gap-4 text-sm text-slate-300'>
                            <p >{data.Year}</p>
                            <span>/</span>
                            <p>{data.Genre}</p>
                            <span>/</span>
                            <p>{data.Runtime}</p>
                            <span>/</span>
                            <p>{data.Language}</p>
                        </div>
                        <div>
                            <p className='font-bold  capitalize '>summary:</p>
                            <p className='text-justify indent-5'>{data.Plot}</p>
                        </div>
                        <div>
                            <div className='border-y py-4 my-4 border-slate-600'>
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
                            <div className='flex justify-between items-center'>
                                {
                                    data.Type === "series" &&
                                    <>
                                        <div className='flex gap-4 items-center'>
                                            <p className='flex items-center  text-slate-300 capitalize'>Seasons: </p>
                                            <p className='flex items-center font-bold text-lg gap-2'>{data.totalSeasons}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <button className='text-slate-800 bg-slate-300 px-6 py-2 rounded-s-xl'
                                                disabled={seasonNumber == 1}
                                                onClick={handlePrevSeason}>Prev Season</button>

                                            <p className='font-bold text-xl'>{seasonNumber}</p>

                                            <button className='text-slate-800 bg-slate-300 px-6 py-2 rounded-e-xl'
                                                disabled={seasonNumber >= season.totalSeasons}
                                                onClick={handleNextSeason}>Next Season</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        {
                            data.Type === "series" &&
                            <>
                                <p className='font-bold text-xl'>Season {seasonNumber} </p>
                                <div className='grid grid-cols-2 gap-4'>
                                    {
                                        season.Episodes.map(s => (
                                            <div key={s.imdbID} className='bg-slate-300 text-black p-3 rounded-xl'>
                                                <div className='flex flex-col items-start '>
                                                    <p className='text-sm'>S{season.Season}.E{s.Episode}</p>
                                                    <p className='font-bold'>{s.Title}</p>
                                                </div>
                                                <p className='text-xs'>{s.Released}</p>
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