import React, { useEffect, useState } from 'react'
import { getSearchValueData } from '../../requests/request'
import RenderMovie from '../renderMovie/RenderMovie';

const Homepage = () => {
    const [search, setSearch] = useState("pokemon")
    const [movie, setMovie] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    const [year, setYear] = useState("")
    const [type, setType] = useState(null)

    const handlesubmit = (e) => {
        e.preventDefault()
        getSearchValueData(search).then(data => setMovie(data))
        setYear("")
        setPageNumber(1)
        setSearch("")
    }
    const filtrele = (e) => {
        e.preventDefault()

        search ?
            getSearchValueData(search, 1, year).then(data => setMovie(data)) :
            getSearchValueData("", 1, year).then(data => setMovie(data))
        setPageNumber(1)
        setYear("")
    }

    const handleType = (e) => {
        const newType = e.target.value
        setType(newType)
        search || year ?
            getSearchValueData(search, 1, year, newType).then(data => setMovie(data)) :
            getSearchValueData("", 1, year, newType).then(data => setMovie(data))

        setPageNumber(1)
    }
    const öncekiSayfa = () => {
        const newPageNumber = pageNumber - 1;
        setPageNumber(newPageNumber);
        year ?
            getSearchValueData(search, newPageNumber, year).then(data => setMovie(data)) :
            getSearchValueData(search, newPageNumber).then(data => setMovie(data))
            ;
    }
    const sonrakiSayfa = () => {
        const newPageNumber = pageNumber + 1;
        setPageNumber(newPageNumber);
        year ?
            getSearchValueData(search, newPageNumber, year).then(data => setMovie(data)) :
            getSearchValueData(search, newPageNumber).then(data => setMovie(data))
            ;
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getSearchValueData();
            setMovie(data);
        };
        fetchData();
    }, []);

    return (
        <section className='container min-vh-100 d-flex flex-column justify-content-center align-items-center '>
            <form onSubmit={(e) => handlesubmit(e)}>
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder='film ara' />
                <button type='submit'>ara</button>
            </form>
            <div className='w-100 d-flex flex-column flex-md-row justify-content-between align-items-center text-capitalize'>
                <div className=' my-2 py-2 d-flex gap-2 align-items-center w-100 '>
                    <p className='fw-bold p-0 m-0'>Search Year:</p>
                    <form onSubmit={(e) => filtrele(e)} className='d-flex w-75   gap-2 '>
                        <input className=" border-0 rounded-2  w-100 px-2 " placeholder='Year...' type="number" min="1900" max="2024" step="1" value={year} onChange={e => setYear(e.target.value)} />
                        <button className=''>Filtrele</button>
                    </form>
                </div>
                <div className='w-100 d-flex gap-2 justify-content-between align-items-center my-2 py-2 '>
                    <div className='w-100 d-flex justify-content-center justify-content-md-end align-items-center gap-2'>
                        <p className='p-0 m-0 fw-bold'>Select Type:</p>
                        <div className='gap-2 d-flex'>
                            <input type="radio" id="alltype" name='selectType' value="null" className='form-check-input' onChange={(e) => { handleType(e) }} />
                            <label htmlFor="alltype">all type</label>
                        </div>
                        <div className='gap-2 d-flex'>
                            <input type="radio" id="movie" name='selectType' value="movie" className='form-check-input' onChange={(e) => { handleType(e) }} />
                            <label htmlFor="movie">Movie</label>
                        </div>
                        <div className='gap-2 d-flex'>
                            <input type="radio" id="series" name='selectType' value="series" className='form-check-input' onChange={(e) => { handleType(e) }} />
                            <label htmlFor="series">series</label>
                        </div>
                    </div>
                </div>
            </div>
            <h4>{movie?.totalResults}</h4>
            <RenderMovie data={movie?.Search} />
            <ul className='pagination'>
                <li className='page-item'>
                    <button className="page-link" disabled={pageNumber == 1 ? true : null} onClick={öncekiSayfa}>Prev</button>
                </li>
                <li className="page-item"><button className="page-link" href="#">{pageNumber}</button></li>
                <li className='page-item'>
                    <button className="page-link" disabled={pageNumber >= Math.ceil(movie?.totalResults / 10)} onClick={sonrakiSayfa} >Next</button>
                </li>
            </ul>
        </section>
    )
}

export default Homepage