
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieCard from './MovieCard';
import { Container, Navbar , Nav, Form, FormControl, Button} from 'react-bootstrap';

// const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=b875e384d7d06c4bf5d9661539c8df14&query"

function App() {

  const [movies,setMovies]= useState([])
  const [query, setQuery]= useState('')

  const [API_URL, setAPI_URL]=useState("https://api.themoviedb.org/3/movie/popular?api_key=b875e384d7d06c4bf5d9661539c8df14")
  
  useEffect(()=>
  {
    fetch(API_URL).then((res)=>res.json()).then((data)=>{
      console.log(data.results);
      setMovies(data.results)
    ;
    })

  },[API_URL])
 
  const changeHandler=(e)=>
  {
    setQuery(e.target.value)
  }

  const searchMovie= async(e)=>
  {
    e.preventDefault()
    console.log('search');
    try {
       const url=`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b875e384d7d06c4bf5d9661539c8df14`
       const res=await fetch(url)
       const data= await res.json()
       console.log(data);
       setMovies(data.results)
       
    } catch (error) {
      console.log(error);
      
    }
  
   
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>
            {" "}
            Movie Search Application{" "}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <div className="d-flex">
              <Button
                className="me-3"
                onClick={() =>
                  setAPI_URL(
                    "https://api.themoviedb.org/3/movie/top_rated?api_key=b875e384d7d06c4bf5d9661539c8df14"
                  )
                }
              >
                Top rated
              </Button>
              <Button
                className="me-3"
                onClick={() =>
                  setAPI_URL(
                    "https://api.themoviedb.org/3/movie/upcoming?api_key=b875e384d7d06c4bf5d9661539c8df14"
                  )
                }
              >
                Upcoming
              </Button>
              <Button
                className="me-3"
                onClick={() =>
                  setAPI_URL(
                    "https://api.themoviedb.org/3/movie/now_playing?api_key=b875e384d7d06c4bf5d9661539c8df14"
                  )
                }
              >
                Now playing
              </Button>
            </div>
            <Form onSubmit={searchMovie} className="d-flex">
              <FormControl
                type="search"
                placeholder="Movie search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {movies.length > 0 ? (
        <div className="container">
          <div className="grid">
            {movies.map((each) => (
              <MovieCard key={each.id} {...each} />
            ))}
          </div>
        </div>
      ) : (
        <div className="nomovies">
          <h2>Sorry !! No movies found</h2>
        </div>
      )}
    </>
  );
}

export default App;
