import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from '../redux/slices/pageNumber';
import { getSearchValueData } from '../request/request';
import { setData } from '../redux/slices/data';
import { setSearchName } from '../redux/slices/searchName';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const searchName = useSelector(state => state.searchNameSlice.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchName.trim() !== "") {
            getSearchValueData(searchName).then(fetchData => dispatch(setData(fetchData)))
            navigate("/")
        }
        else {
            toast.warning("Film ismi giriniz")
        }
        dispatch(setPageNumber(1))
    }
    return (
        <div className='flex flex-col md:flex-row items-center justify-between bg-slate-300 px-6 lg:px-16 xl:px-24 text-slate-800 '>
            <div className='flex flex-col md:flex-row items-center gap-3 md:gap-12'>
                <div className='flex flex-col items-center  my-2 '>
                    <div className='font-bold text-4xl flex flex-col items-end'>invent
                        <span className='uppercase text-xs'> Analytics</span>
                        <span className='text-xs font-bold text-end '>Frontend Case</span>
                    </div>
                </div>
                <Link to={"/"} className='text-lg font-bold'>Home</Link>
            </div>
            <form onSubmit={(e) => handleSearch(e)} className='flex items-stretch justify-center py-4'>
                <input className='text-white bg-slate-600 py-2 px-2 rounded-s-xl' type="search" value={searchName} onChange={e => dispatch(setSearchName(e.target.value))} placeholder='Search movie or series...' />
                <button type='submit' className='px-6 py-2  bg-white hover:bg-slate-600 text-slate-600 hover:text-white rounded-e-xl'>Search</button>
            </form>
        </div>


    )
}

export default Navbar