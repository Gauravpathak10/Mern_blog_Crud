import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineRollback } from 'react-icons/ai'
import { MdContentPaste, MdTitle } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

const EditBlogs = () => {
    const [data, setdata] = useState([])
    const [title, settitle] = useState([])
    const [descp, setdescp] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getdata()
    }, [])
    const getdata = () => {
        axios.get(`http://localhost:4000/view/${id}`)
            .then((res) => {
                setdata(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const Edited = () => {
        const data = { title, descp }
        axios.put(`http://localhost:4000/edit/${id}`, data)
            .then((res) => {
                settitle('')
                setdescp('')
                getdata()

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className='nav'>
                <p> title :{data.title}</p>
                <p> Description: {data.descp}</p>
                <Link to='/' title='Go back'><AiOutlineRollback /></Link>
            </div>
            <div className='form'>
                <div className='mid'>
                    <MdTitle />
                    <input type="text" value={title} onChange={(e) => { settitle(e.target.value) }} placeholder='..Enter New Title' />
                </div>
                <div className="mid">
                    <MdContentPaste />
                    <input type="text" value={descp} onChange={(e) => { setdescp(e.target.value) }} placeholder='..Enter New description' />
                </div>
                <button type='submit' onClick={Edited}>Submit</button>

            </div>
        </>
    )
}

export default EditBlogs