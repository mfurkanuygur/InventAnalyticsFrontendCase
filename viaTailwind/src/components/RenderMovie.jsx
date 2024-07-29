import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";
const RenderMovie = ({ data }) => {
    return (
        <div className=' w-full  rounded-xl border-2 overflow-hidden'>
            <table className="table-auto  w-full  text-center bg-white text-secondary ">
                <thead >
                    <tr className='divide-x divide-black  uppercase italic text-primary '>
                        <th className='py-3 italic text-xl'>#</th>
                        <th className='py-3'>Poster</th>
                        <th className='py-4 flex justify-center items-center w-full'>Name<span className='block md:hidden'>/Type</span></th>
                        <th className='py-3'>Year</th>
                        <th className='hidden md:block py-4'>Type</th>
                        <th className='py-3 px-2 '><TiInfoLarge className='md:w-full text-xl'/></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.Search?.map(d => (
                            <tr key={d.imdbID} className='border-y-2 last:border-b-0 divide-x  w-full text-center capitalize'>
                                <td ><p className='text-xs md:text-base -rotate-45'># {d.imdbID}</p></td>
                                <td className='p-1'><img src={d.Poster} className='w-44 md:w-24 h-auto md:h-36  mx-auto rounded-xl' /></td>
                                <td>
                                    <p className='font-bold md:text-lg '>{d.Title}</p>
                                    <p className='block md:hidden text-xs border-t-2 pt-2 mt-2 w-min mx-auto'>{d.Type}</p>
                                </td>
                                <td><p>{d.Year}</p></td>
                                <td className='hidden md:flex justify-center items-center min-h-40  '><p>{d.Type}</p></td>
                                <td className=''><Link to={`/detail/${d.imdbID}`}><FaAngleDoubleRight className='w-full text-xl md:text-2xl text-primary hover:text-primary_hover animate-pulse' /></Link></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default RenderMovie