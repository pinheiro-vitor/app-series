import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SerieView from './components/SeriesListView';

function App() {

  const [seriesList, setSeriesList] = useState([{}])
  const [title, setTitle] = useState('')
  const [tv_network, setTv] = useState('')
  const [showrunner, setShow] = useState('')
  const [cast, setCast] = useState('')
  const [genre, setGenre] = useState('')
  const [n_episodes, setEpisodes] = useState('')
  const [n_seasons, setSeasons] = useState('')
  const [imdb_rating, setRating] = useState('')

    //Read all
    useEffect(() => 
    {axios.get('http://localhost:8000/api/series')
    .then(res => {
      setSeriesList(res.data)
        })
    }, []);

    //Post a serie
    const addSerieHandler = () => {
      axios.post('http://localhost:8000/api/series/', { 'title': title,
      'tv_network': tv_network,
      'showrunner': showrunner,
      'cast': cast,
      'genre': genre,
      'n_episodes': n_episodes,
      'n_seasons': n_seasons,
      'imdb_rating': imdb_rating,
      })
      .then(res => console.log(res))
    };

  return (
    <div className="App list-group-item justify-content-center align-items-center
    mx auto" style={{"width": "400px", "backgroundColor": "black", "marginTop": "15px"}}>
      <h1 className="card text-black mb-1" styleName="max-width: 20rem;">SERIES MANAGEMENT</h1>
      <h6 className="card text-black mb-3">FastAPI - React - MongoDB</h6>
      <div className="card-body">
      <h5 className="card text-white bg-danger mb-3">Add a Serie</h5>
        <span className="card-text">
        <input className="mb-2 form-controll titleIn"   onChange={event =>
         setTitle(event.target.value)}  placeholder="Title"/>
        <input className="mb-2 form-controll tv_networkIn"   onChange={event =>
         setTv(event.target.value)}  placeholder="Tv Network"/>
        <input className="mb-2 form-controll showrunnerIn"   onChange={event =>
         setShow(event.target.value)}   placeholder="Showrunner"/>
        <input className="mb-2 form-controll castIn"   onChange={event =>
         setCast(event.target.value)}   placeholder="Cast"/>
        <input className="mb-2 form-controll genreIn"   onChange={event =>
         setGenre(event.target.value)}   placeholder="Genre"/>
        <input className="mb-2 form-controll n_episodesIn"   onChange={event =>
         setEpisodes(event.target.value)}   placeholder="Nº Episodes"/>
        <input className="mb-2 form-controll n_seasonsIn"   onChange={event =>
         setSeasons(event.target.value)}   placeholder="Nº Seasons"/>
        <input className="mb-2 form-controll imbd_ratingIn"   onChange={event =>
         setRating(event.target.value)}   placeholder="IMBD Rating"/>

        <button className="btn btn-outline-danger mt-3 mx-2 mb-3" style={
          {"borderRadius": "50px", "fontWeight": "bold"}} onClick={addSerieHandler}>Add Serie</button>
        </span>

        <h5 className="card text-white bg-danger mb-3">Series list</h5>
        <div>
        <SerieView seriesList={seriesList}/>
        </div>
    </div>
        <h6 className=" card text-dark bg-warning py-1 mb-0">Copyright
        2022, All rights reserved &copy;</h6>
    </div>
  );
}

export default App;
