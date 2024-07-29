import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RenderMovie from './RenderMovie';
import { getSearchValueData } from '../request/request';
import { setSearchName } from '../redux/slices/searchName';
import { setMovieType } from '../redux/slices/movieType';
import { setYearNumber } from '../redux/slices/yearFilter';
import { decrement, increment, setPageNumber } from '../redux/slices/pageNumber';
import { setData } from '../redux/slices/data';

const Home = () => {
    const pageNumber = useSelector(state => state.pageNumberSlice.value);
    const searchName = useSelector(state => state.searchNameSlice.value);
    const movieType = useSelector(state => state.movieTypeSlice.value);
    const yearFilter = useSelector(state => state.yearFilterSlice.value)
    const data = useSelector(state => state.dataSlice.value)
    const dispatch = useDispatch();
    // const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const fetchData = await getSearchValueData(searchName, pageNumber, yearFilter, movieType);
            dispatch(setData(fetchData));
        };
        fetchData();
    }, [])



    const handleYear = (e) => {
        e.preventDefault()
        getSearchValueData(searchName, pageNumber, yearFilter, movieType).then(fetchData => dispatch(setData(fetchData)));
        dispatch(setPageNumber(1))
    }

    const handleType = (e) => {
        const newType = e.target.value
        dispatch(setMovieType(e.target.value))
        dispatch(setPageNumber(1))
        getSearchValueData(searchName, 1, yearFilter, newType).then(fetchData => dispatch(setData(fetchData)));
    }

    const prevPage = () => {
        const newPageNumber = pageNumber - 1;
        dispatch(decrement())
        getSearchValueData(searchName, newPageNumber, yearFilter, movieType).then(fetchData => dispatch(setData(fetchData)));
    };

    const nextPage = () => {
        const newPageNumber = pageNumber + 1;
        dispatch(increment())
        getSearchValueData(searchName, newPageNumber, yearFilter, movieType).then(fetchData => dispatch(setData(fetchData)));
    };
    return (
        <section className='flex flex-col gap-4 justify-center items-center min-h-dvh bg-slate-400 py-16'>

            <div className=' w-full md:w-2/3 flex flex-col lg:flex-row justify-evenly items-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-1'>
                    <p className='font-bold text-lg text-slate-800'>Enter Year:</p>
                    <form onSubmit={(e) => handleYear(e)} className='flex items-stretch justify-center '>
                        <input className='text-white outline-none bg-slate-500 py-2 px-2 rounded-s-xl ' value={yearFilter == "null" ? "" : yearFilter} type="search" onChange={e => dispatch(setYearNumber(e.target.value))} placeholder='Movie or Series year...' />
                        <button type='submit' className='px-6 py-2  bg-white hover:bg-slate-500 text-slate-800 hover:text-white rounded-e-xl'>Filter</button>
                    </form>
                </div>
                <div className='flex flex-col justify-center items-start gap-1 capitalize '>
                    <p className='font-bold text-lg text-slate-800'>Select Type:</p>
                    <div className='flex justify-center items-center gap-4 bg-slate-500 rounded-xl '>
                        <div className='flex items-center gap-2 px-2 md:px-6 py-2 '>
                            <input checked={movieType == "null"} type="radio" id="alltype" name='selectType' value="null" className='w-5 h-5 checked:bg-black' onChange={handleType} />
                            <label htmlFor="alltype" className='cursor-pointer'>all type</label>
                        </div>
                        <div className='flex items-center  gap-2 border-x-2 px-2 md:px-6 py-2 '>
                            <input checked={movieType == "movie"} type="radio" id="movie" name='selectType' value="movie" className=" w-5 h-5" onChange={handleType} />
                            <label htmlFor="movie" className='cursor-pointer'>Movie</label>
                        </div>
                        <div className='flex items-center gap-2 px-2 md:px-6 py-2 '>
                            <input checked={movieType == "series"} type="radio" id="series" name='selectType' value="series" className='w-5 h-5' onChange={handleType} />
                            <label htmlFor="series" className='cursor-pointer'>series</label>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='font-bold text-2xl text-black'>Total Results: {data?.totalResults}</h1>
            {
                data &&
                <>
                    <RenderMovie data={data} />
                    <div className='flex items-center bg-slate-600  gap-3 rounded-xl '>
                        <button className="hover:bg-slate-300 px-6 py-2 rounded-s-xl" disabled={pageNumber == 1 ? true : null} onClick={prevPage}>Prev</button>
                        <p className="font-bold text-2xl" href="#">{pageNumber}</p>
                        <button className="hover:bg-slate-300 px-6 py-2 rounded-e-xl" disabled={pageNumber >= Math.ceil(data?.totalResults / 10)} onClick={nextPage} >Next</button>
                    </div>
                </>
                ||
                <div>Loading...</div>
            }

        </section>
    )
}

export default Home