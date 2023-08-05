import { Button, Modal } from 'react-bootstrap'
import {React, useState} from 'react'
const IMG_URL="https://image.tmdb.org/t/p/w500/"
const MovieCard = ({title, poster_path, vote_average, release_date,overview}) => {
   

const [show, setShow]= useState(false)
const handleShow=()=>setShow(true)
const handleClose=()=>setShow(false)


  return (

    <div className='card text-center bg-secondary mb-3'>
      <div className='card-body'>
        <div className='card-title'>{title}</div>
      <img className='card-img-top' src={IMG_URL+poster_path} alt='' />
      <div className='card-body'>
        <button type='button' className='btn btn-dark' onClick={handleShow}>View More</button>
      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body style={{ maxHeight:'70vh', overflowY:'auto'}}>
           <img className='card-image-top1' src={IMG_URL+poster_path} alt='' />
           <h3>{title}</h3>
           <h4>IMDb : {vote_average}</h4>
           <h5>Release Date: {release_date}</h5>
           <br />
           <h6>Overview</h6>
           <p>{overview}</p>
        </Modal.Body>
        <Modal.Footer >
          <Button variant='secondary' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      </div>
    
        </div>
    </div>
  )
}

export default MovieCard