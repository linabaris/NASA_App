import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import LOGO from './assets/logo.svg';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";



function App() {

  const key = "enk842COh6JaJM3jyJsJVbXLWQ3aoTklgvWKBuAT";
  const url = "https://api.nasa.gov/planetary/apod?api_key=";
  const [data, setData] = useState([]);
  const [imgLib, setImgLib] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      const response = await axios.get(`${url}${key}`);
      setData(response.data)
    }
    fetchData();
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://images-api.nasa.gov/search?media_type=image&page_size=15&q=planet")
      setImgLib(response.data)
    }
    fetchData()
  }, [])
  const { collection } = imgLib;
  
  return (
    <div className="App">
      <main className="App-wrapper">
        <header className='header'>
          <div className='header__logo'>
            <img src={LOGO} alt='logo'></img>
          </div>
          <nav className='header__nav'>
            <a className='nav__link' href='*'>Exoplanets</a>
            <a className='nav__link' href='*'>News</a>
            <a className='nav__link' href='*'>Blog</a>
          </nav>
        </header>
        <h1>Astro Photo Every Day</h1>
        <div className='pic_of_day'>
          <div className='astro-photo__main'>
            <img src={data.url} alt={data.title} className="photo-today"></img>
          </div>
          <span className='explanation'>{data.explanation}</span>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{clickable:true,}}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='swiper__container'
        >
          { collection ? 
            collection.items.map(item => {
              return (
                <SwiperSlide>
                  <div className='astro-galery'>
                    <img className='slide-pic' alt='nasa' src={item.links[0].href}></img>
                  </div>
                </SwiperSlide>
              )
          }) :
            <div/>
          }
        </Swiper>
      </main>
    </div>
  );
}

export default App;
