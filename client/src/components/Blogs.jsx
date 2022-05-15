import React, { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdContentPaste, MdTitle } from 'react-icons/md'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const [title, settitle] = useState([])
    const [descp, setdescp] = useState([])
    const [data, setdata] = useState([])

    useEffect(() => {
        checkD()
    }, [])
    const checkD = () => {
        axios.get('http://localhost:4000/read')
            .then((res) => {
                setdata(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const SendData = () => {

        const data = { title, descp }
        axios.post('http://localhost:4000/create', data)
            .then((res) => {
                settitle('')
                setdescp('')
                checkD()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const Deleted = (e) => {
        axios.delete(`http://localhost:4000/delete/${e.target.id}`)
            .then((res) => {
                console.log(res.data.data)
                checkD()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className='form'>
                <div className='mid'>
                    <MdTitle />
                    <input type="text" placeholder='..title' value={title} onChange={(e) => settitle(e.target.value)} />
                </div>
                <div className="mid">
                    <MdContentPaste />
                    <input type="text" placeholder='..description' value={descp} onChange={(e) => setdescp(e.target.value)} />
                </div>
                <button type='submit' onClick={SendData}>Submit</button>
            </div>
            {data.map((list, i) => {
                return (
                    <div key={i} className='Blog'>
                        <li>Title: {list.title}</li>
                        <li>Description: {list.descp}</li>
                        <li>Date: {list.time}</li>
                        <div className='float'>
                            <Link to={`/edit/${list._id}`}><AiOutlineEdit /> </Link>
                            <button id={list._id} onClick={Deleted}>X</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Blogs