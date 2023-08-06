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
    <div className="card text-center bg-secondary mb-3">
      <div className="card-body">
        <div className="card-title">{title}</div>
        <img className="card-img-top" src={IMG_URL + poster_path} alt="" />
        <div className="card-body">
          <button type="button" className="btn btn-dark" onClick={handleShow}>
            View More
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <img
                className="card-image-top1"
                src={IMG_URL + poster_path}
                alt=""
              />
              <h3>{title}</h3>
              <h4>IMDb : {vote_average}</h4>
              <h5>Release Date: {release_date}</h5>
              <br />
              <h6>Overview :</h6>
              <p>{overview}</p>
              <h5>Reviews :</h5>
              {review.length > 0 ? (
                <div>
                  {review.map((each) => (
                    <div className="reviews" key={each.id}>
                      <div className="reviewauthor">
                        <h6>
                          {each.author} <br />
                          <span>
                            <h8
                              style={{
                                fontStyle: "italic",
                                textDecoration: "underline",
                              }}
                            >
                              @{each.author_details.username}
                            </h8>
                          </span>
                        </h6>

                        <span>
                         
                          <img
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "25px",
                              border: "1px solid black",
                            }}
                            src={
                              each.author_details.avatar_path
                                ? IMG_URL + each.author_details.avatar_path
                                : avatarImage
                            }
                            alt="avatar"
                          ></img>
                        </span>
                      </div>
                      <p>
                        Rating :{" "}
                        {each.author_details.rating
                          ? each.author_details.rating + "/10"
                          : "Not reviewed"}
                      </p>
                      <p
                        className={`review-content ${
                          expandReview ? "expanded" : ""
                        }`}
                      >
                        {each.content}{" "}
                      </p>
                      <span
                        className={`${
                          expandReview ? "hidelines" : "showlines"
                        }`}
                      >
                        ...
                      </span>
                      <button onClick={() => expand()}>
                        {expandReview ? "View less" : "View more"}
                      </button>
                      <div> </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No reviews added!!</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MovieCard