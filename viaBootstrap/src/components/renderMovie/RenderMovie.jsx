import React from 'react'
import { Link } from 'react-router-dom'

const RenderMovie = ({ data }) => {
    return (
        <table className="table table-responsive table-striped table-hover table-dark text-center ">
            <thead>
                <tr>
                    <th scope="col"># imdbID</th>
                    <th scope="col" className=''>Poster</th>
                    <th scope="col">Name</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody className='align-middle text-capitalize'>
                {
                    data?.map((d) => (
                        <tr key={d.imdbID}>
                            <td># {d.imdbID}</td>
                            <td className=''>
                                <img src={d?.Poster} alt={d.Title} className=' h-25 w-25' />
                            </td>
                            <Link to={`${d.imdbID}`} className='bg-danger mh-100 d-block '>
                                <td className='d-inline-block'>{d.Title}</td>
                            </Link>
                            <td>{d.Year}</td>
                            <td>{d.Type}</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default RenderMovie