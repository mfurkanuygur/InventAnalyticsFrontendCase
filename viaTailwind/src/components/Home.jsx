import React, { useEffect, useState } from 'react'
import { getSearchValueData } from '../request/request';
import { toast } from 'react-toastify';
import RenderMovie from './RenderMovie';

const Home = () => {

    const [data, setData] = useState()
    const [searchValue, setSearchValue] = useState("Pokemon")
    const [year, setYear] = useState("")
    const [type, setType] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const fetchData = await getSearchValueData();
            setData(fetchData);
            setSearchValue("")
            setPageNumber(1)
        };
        fetchData();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        searchValue.trim() !== "" ?
            getSearchValueData(searchValue).then(fetchData => setData(fetchData)) : toast.warning("Film ismi giriniz")
        // setYear("")
        setPageNumber(1)
        // setSearchValue("")
    }
    const handleYear = (e) => {
        e.preventDefault()
        const search = searchValue || "pokemon";
        const typeValue = type || null;
        const yearValue = year || null;
        getSearchValueData(search, 1, yearValue, typeValue).then(fetchData => setData(fetchData));
        setPageNumber(1);
    }
    const handleType = (e) => {
        const newType = e.target.value
        setType(newType)
        const search = searchValue || "pokemon";
        const typeValue = newType || null;
        const yearValue = year || null;
        getSearchValueData(search, 1, yearValue, typeValue).then(fetchData => setData(fetchData));
        setPageNumber(1);
    }

    const prevPage = () => {
        const newPageNumber = pageNumber - 1;
        setPageNumber(newPageNumber);
        const typeValue = type || null;
        const search = searchValue || "pokemon";
        const yearValue = year || null;
        getSearchValueData(search, newPageNumber, yearValue, typeValue).then(fetchData => setData(fetchData));
    };

    const nextPage = () => {
        const newPageNumber = pageNumber + 1;
        setPageNumber(newPageNumber);
        const typeValue = type || null;
        const search = searchValue || "pokemon";
        const yearValue = year || null;
        getSearchValueData(search, newPageNumber, yearValue, typeValue).then(fetchData => setData(fetchData));
    };
    return (
        <section className='flex flex-col gap-4 justify-center items-center min-h-dvh bg-slate-400 py-16'>
            <form onSubmit={(e) => handleSearch(e)} className='flex items-stretch justify-center '>
                <input className='text-white bg-zinc-600 py-2 px-2 rounded-s-xl' type="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder='Search movie or series...' />
                <button type='submit' className='px-6 py-2  bg-white hover:bg-zinc-600 text-zinc-600 hover:text-white rounded-e-xl'>Search</button>
            </form>
            <div className=' w-full md:w-2/3 flex flex-col lg:flex-row justify-between items-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-1'>
                    <p className='font-bold text-lg text-slate-800'>Enter Year:</p>
                    <form onSubmit={(e) => handleYear(e)} className='flex items-stretch justify-center '>
                        <input className='text-white outline-none bg-slate-500 py-2 px-2 rounded-s-xl ' type="search" value={year} onChange={e => setYear(e.target.value)} placeholder='Movie or Series year...' />
                        <button type='submit' className='px-6 py-2  bg-white hover:bg-slate-500 text-slate-800 hover:text-white rounded-e-xl'>Filter</button>
                    </form>
                </div>
                <div className='flex flex-col justify-center items-start gap-1 capitalize '>
                    <p className='font-bold text-lg text-slate-800'>Select Type:</p>
                    <div className='flex justify-center items-center gap-4 bg-slate-500 rounded-xl '>
                        <div className='flex items-center gap-2 px-2 md:px-6 py-2 '>
                            <input type="radio" id="alltype" name='selectType' value="null" className='w-5 h-5 checked:bg-black' onChange={handleType} />
                            <label htmlFor="alltype" className='cursor-pointer'>all type</label>
                        </div>
                        <div className='flex items-center  gap-2 border-x-2 px-2 md:px-6 py-2 '>
                            <input type="radio" id="movie" name='selectType' value="movie" className=" w-5 h-5" onChange={handleType} />
                            <label htmlFor="movie" className='cursor-pointer'>Movie</label>
                        </div>
                        <div className='flex items-center gap-2 px-2 md:px-6 py-2 '>
                            <input type="radio" id="series" name='selectType' value="series" className='w-5 h-5' onChange={handleType} />
                            <label htmlFor="series" className='cursor-pointer'>series</label>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='font-bold text-2xl text-black'>Total Results: {data?.totalResults}</h1>
            <RenderMovie data={data} />
            <div className='flex items-center bg-slate-600  gap-3 rounded-xl '>
                <button className="hover:bg-slate-300 px-6 py-2 rounded-s-xl" disabled={pageNumber == 1 ? true : null} onClick={prevPage}>Prev</button>
                <p className="font-bold text-2xl" href="#">{pageNumber}</p>
                <button className="hover:bg-slate-300 px-6 py-2 rounded-e-xl" disabled={pageNumber >= Math.ceil(data?.totalResults / 10)} onClick={nextPage} >Next</button>
            </div>
        </section>
    )
}

export default Home