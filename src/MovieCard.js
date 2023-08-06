import { Button, Modal } from 'react-bootstrap'
import {React, useState} from 'react'
import './App.css';
import avatarImage from './avatar.jpg'
const IMG_URL="https://image.tmdb.org/t/p/w500/"

const MovieCard = ({title, poster_path, vote_average, release_date,overview, id}) => {
   

const [show, setShow]= useState(false)

const[ review, setReview]= useState([])


const [expandReview, setExpandReview]=useState(false)


const expand =()=>
{
  if(expandReview){
    setExpandReview(false)
  }else{
    setExpandReview(true)
  }
}
const handleShow= async ()=>{
  const url =`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=b875e384d7d06c4bf5d9661539c8df14`
  const res= await fetch(url)
  const data= await res.json()
  console.log(data.results)
  setReview(data.results)
  console.log(review);
  
  setShow(true)
}
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
           <h6>Overview :</h6>
           <p>{overview}</p>
           <h5>Reviews :</h5>
          { review.map((each)=>(
            <div key={each.id}>
              <h6>{each.author}<span> <img 
              style={{width:'30px', height:'30px', borderRadius:'10px'}} 
              src={each.author_details.avatar_path
                ? IMG_URL+each.author_details.avatar_path 
                :avatarImage}
                alt='avatar'></img></span></h6>
             
              <p className={`review-content ${expandReview ? 'expanded' : ''}`}>{each.content} </p>
              <span className={`${expandReview?'hidelines': 'showlines'}`}>...</span>
              <button onClick={()=>expand()}>
                {expandReview? 'View less':'View more'}
              </button>
            </div>
           ))}
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