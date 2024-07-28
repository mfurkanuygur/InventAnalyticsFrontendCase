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

    const handleType = (e) => {
        const newType = e.target.value
        setType(newType)
        search || year ?
            getSearchValueData(search, 1, year, newType).then(data => setMovie(data)) :
            getSearchValueData("", 1, year, newType).then(data => setMovie(data))

        setPageNumber(1)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getSearchValueData();
            setMovie(data);
        };
        fetchData();
    }, []);

    return (
        <div className='container min-vh-100 d-flex flex-column justify-content-center align-items-center '>
            <form onSubmit={(e) => handlesubmit(e)}>
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder='film ara' />
                <button type='submit'>ara</button>
            </form>
            {/* {
                movie?.Search?.map(m => (
                    <div key={m.imdbID}>
                    <p>{m.Title}</p>
                    </div>
                    ))
                } */}
            <div className='w-100 bg-danger d-flex gap-2 justify-content-between align-items-center text-capitalize'>
                <div className='w-50 d-flex flex-column align-items-center my-2 py-2'>
                    <p>Select Type:</p>
                    <div className='d-flex align-items-center gap-2'>
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
                <div className='w-50 my-2 py-2'>
                    <label htmlFor="year">Search Year:</label>
                    <form onSubmit={(e)=>filtrele(e)}>
                        <input className=" p-2 w-25 border-0 rounded-2 d-flex justify-content-between" placeholder='Year...' type="number" min="1900" max="2024" step="1" value={year} onChange={e => setYear(e.target.value)} />
                        <button >Filtrele</button>
                    </form>

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
        </div>
    )
}

export default Homepage