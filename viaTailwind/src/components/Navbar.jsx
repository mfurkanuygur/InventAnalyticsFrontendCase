import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber } from '../redux/slices/pageNumber';
import { getSearchValueData } from '../request/request';
import { setData } from '../redux/slices/data';
import { setSearchName } from '../redux/slices/searchName';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { setYearNumber } from '../redux/slices/yearFilter';
const Navbar = () => {
    const searchName = useSelector(state => state.searchNameSlice.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchName.trim() !== "") {
            dispatch(setYearNumber("null"))
            getSearchValueData(searchName).then(fetchData => dispatch(setData(fetchData)))
            navigate("/")
        }
        else {
            toast.error("Enter a Movie or Series Name!!!")
        }
        dispatch(setPageNumber(1))
    }
    return (
        <div className='fixed z-50 shadow-2xl w-full flex flex-col md:flex-row items-center justify-between px-3 lg:px-32 bg-white  text-secondary'>
            <div className='flex justify-between w-full items-center gap-3 md:gap-12'>
                <div className='flex flex-col md:flex-row items-center  my-2  gap-16'>
                    <Link to={"/"}>
                        <div className='font-bold text-2xl md:text-4xl flex flex-col items-end leading-3 md:leading-9 '>
                            <p >invent</p>
                            <span className='lowercase md:uppercase text-xs text-primary '> Analytics</span>
                            <span className='text-xs font-bold text-end text-primary '>Frontend Case</span>
                        </div>
                    </Link>
                    <Link to={"/"} className='hidden md:block text-lg font-bold hover:text-primary_hover'>Home</Link>
                </div>
                <div className='flex flex-row gap-8 items-center'>
                    <Link to={"/"} className='block md:hidden text-lg font-bold'>
                        <FaHome className='text-xl' />
                    </Link>
                    <FaSearch onClick={() => setOpen(!open)} className='text-xl block md:hidden cursor-pointer' />
                </div>
            </div>
            {
                open &&
                <form onSubmit={(e) => handleSearch(e)} className=' items-stretch justify-center py-4 flex md:hidden'>
                    <input className=' py-2 px-2 rounded-s-xl border-2 border-e-0 border-secondary  text-secondary focus:outline-none' type="search" value={searchName} onChange={e => dispatch(setSearchName(e.target.value))} placeholder='Search movie or series...' />
                    <button type='submit' className='bg-secondary text-white hover:bg-primary_hover px-6 py-2   hover:bg-slate-600 text-slate-600 hover:text-white rounded-e-xl'>Search</button>
                </form>
            }
            <form onSubmit={(e) => handleSearch(e)} className=' items-stretch justify-center py-4 hidden md:flex'>
                <input className='  py-2 px-2 rounded-s-xl border-2 border-e-0 border-secondary  text-secondary focus:outline-none' type="search" value={searchName} onChange={e => dispatch(setSearchName(e.target.value))} placeholder='Search movie or series...' />
                <button type='submit' className='bg-secondary text-white hover:bg-primary_hover px-6 py-2 hover:bg-slate-600 text-slate-600 hover:text-white rounded-e-xl'>Search</button>
            </form>
        </div>


    )
}

export default Navbar