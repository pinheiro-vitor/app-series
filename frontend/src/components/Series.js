import axios from 'axios'
import React from 'react'

function SerieItem(props) {
    const deleteSerieHandler = (title) => {
        axios.delete(`http://localhost:8000/api/series/${title}`)
        .then(res => console.log(res.data))}
        return (
                <div className='bg-light'>
                    <span style={{ fontWeight: 'bold, underline' }}>{props.serie.title}
                    </span> {props.serie.imbd_rating}
                    <button onClick={() => deleteSerieHandler(props.serie.title)}
                    className='btn btn-outline-danger my-2 mx-2' style={
                    {'borderRadius':'50px'}}>X</button>
            </div>
        )
}

export default SerieItem;