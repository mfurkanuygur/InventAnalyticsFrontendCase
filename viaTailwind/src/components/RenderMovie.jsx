import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
const RenderMovie = ({ data }) => {
    return (
        <table className="table-auto  md:w-2/3 mx-5 md:mx-0 border-2 border-slate-500 text-center">
            <thead className=' '>
                <tr className=' border-slate-100 bg-slate-500'>
                    <th className='py-3 border-b-2 border-slate-300'>#</th>
                    <th className='py-3 border-b-2 border-slate-300'>Poster</th>
                    <th className='py-3 border-b-2 border-slate-300'>Name</th>
                    <th className='py-3 border-b-2 border-slate-300'>Year</th>
                    <th className='py-3 border-b-2 border-slate-300'>Type</th>
                    <th className='py-3 border-b-2 border-slate-300'>
                        <BiDetail className='w-full px-4 text-xl' />
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.Search?.map((d) => (
                        <tr key={d.imdbID} className=' hover:bg-slate-300 hover:text-black  transition-all cursor-pointer capitalize'>
                            <td className='py-3 border-2 border-slate-500 lowercase w-32'># {d?.imdbID}</td>
                            <td className='p-3 border-2 border-slate-500 lowercase w-32'> <img className='rounded-xl bg-gray-500 w-24 h-32' src={d?.Poster} /></td>
                            <td className='py-3 border-2 border-slate-500 w-1/3 h-20'>{d?.Title}</td>
                            <td className='py-3 border-2 border-slate-500 w-40'>{d?.Year}</td>
                            <td className='py-3 border-2 border-slate-500 w-20'>{d?.Type}</td>
                            <td className='py-3 border-2 border-slate-500 hover:bg-slate-500  p-3'>
                                <Link to={`${d.imdbID}`} className='w-full' title="Detail">
                                    <FaAngleDoubleRight className='w-full  text-2xl hover:animate-ping' />
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default RenderMovie