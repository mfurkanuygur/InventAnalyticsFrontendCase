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
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import notfoundgif from '../assets/notfound.gif'

const Home = () => {
    const pageNumber = useSelector(state => state.pageNumberSlice.value);
    const searchName = useSelector(state => state.searchNameSlice.value);
    const movieType = useSelector(state => state.movieTypeSlice.value);
    const yearFilter = useSelector(state => state.yearFilterSlice.value)
    const data = useSelector(state => state.dataSlice.value)
    console.log(data)
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
        <section className='flex flex-col gap-4 justify-center items-center min-h-dvh px-2   text-secondary py-24 lg:px-32 '>

            <div className=' w-full  flex flex-col md:flex-row justify-between items-center md:items-end gap-4  '>
                <div className='flex flex-col justify-center items-start gap-1 capitalize  '>
                    <p className='font-bold text-lg text-white w-full text-center md:text-left'>Select Type</p>
                    <div className='flex justify-center items-center  divide-x divide-secondary rounded-xl px-2  bg-white'>
                        <div className='flex items-center gap-2 py-2 px-3'>
                            <input checked={movieType == "null"} type="radio" id="alltype" name='selectType' value="null"
                                className='w-5 h-5 peer relative appearance-none border-2 border-primary rounded-full  bg-white 
                               focus:bg-primary_hover checked:bg-primary_hover checked:border-none'
                                onChange={handleType} />
                            <label htmlFor="alltype" className='cursor-pointer'>all type</label>
                        </div>
                        <div className='flex items-center gap-2 py-2 px-4 '>
                            <input checked={movieType == "movie"} type="radio" id="movie" name='selectType' value="movie"
                                className="w-5 h-5 peer relative appearance-none border-2 border-primary rounded-full  bg-white 
                            focus:bg-primary_hover checked:bg-primary_hover checked:border-none"
                                onChange={handleType} />
                            <label htmlFor="movie" className='cursor-pointer'>Movie</label>
                        </div>
                        <div className='flex items-center gap-2 py-2 px-3'>
                            <input checked={movieType == "series"} type="radio" id="series" name='selectType' value="series"
                                className='w-5 h-5 peer relative appearance-none border-2 border-primary rounded-full  bg-white 
                            focus:bg-primary_hover checked:bg-primary_hover checked:border-none' onChange={handleType} />
                            <label htmlFor="series" className='cursor-pointer'>series</label>
                        </div>
                    </div>
                </div>
                <h1 className='hidden md:block text-xl text-white font-semibold'>Total Results: {data?.totalResults}</h1>
                <div className='flex flex-col items-start justify-center gap-1  '>
                    <p className='font-bold text-lg text-white w-full text-center md:text-left'>Enter Year</p>
                    <form onSubmit={(e) => handleYear(e)} className='flex items-center justify-center text-secondary'>
                        <input className='focus:outline-none  py-2 px-2 rounded-s-xl w-full' value={yearFilter == "null" ? "" : yearFilter} max="2024" step="1" type='number' onChange={e => dispatch(setYearNumber(e.target.value))} placeholder='Movie or Series year...' />
                        <button type='submit' className='bg-primary hover:bg-primary_hover px-4 py-2  hover:text-white rounded-e-xl'>Filter</button>
                    </form>
                </div>
                <h1 className='block md:hidden text-lg text-white font-semibold'>Total Results: {data?.totalResults}</h1>

            </div>

            {
                data?.Response == "True" &&
                <>
                    <RenderMovie data={data} />
                    <div className='flex items-center bg-white py-2  rounded-xl  '>
                        <button className=" text-primary px-4 rounded-s-xl hover:text-secondary"
                            disabled={pageNumber == 1 ? true : null} onClick={prevPage}>
                            <FaAngleDoubleLeft className='text-xl' />
                        </button>
                        <p className="font-bold text-2xl bg-white  px-3 border-x-2 border-secondary" href="#">{pageNumber}</p>
                        <button className=" px-4 rounded-e-xl  text-primary hover:text-secondary"
                            disabled={pageNumber >= Math.ceil(data?.totalResults / 10)} onClick={nextPage} >
                            <FaAngleDoubleRight className='text-xl' />
                        </button>
                    </div>
                </>
                ||
                <div className='flex flex-col justify-center items-center text-white font-bold text-3xl'>
                    <img src={notfoundgif} alt="Not Found" />
                    {data?.Error}
                </div>
            }

        </section>
    )
}

export default Home