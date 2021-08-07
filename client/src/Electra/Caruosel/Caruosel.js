import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import image1 from './background/1.jpg'
import image2 from './background/2.jpg'
import image3 from './background/3.jpg'
import image4 from './background/4.jpg'
import { Link } from 'react-router-dom'

const Caruosel = () => {
  return (
    <div className="slide-container" dir="ltr">
      <Slide>
        <Link to='/items/refrigerators'>
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${image1})`, width: '100%', height: '600px' }}>
            </div>
          </div>
        </Link>
        <Link to='/items/refrigerators'>
        <div className="each-slide">
          <div style={{ 'backgroundImage': `url(${image2})`, width: '100%', height: '600px' }}>
          </div>
        </div>
        </Link> 
        <Link to='/items/computers'>  
        <div className="each-slide">
          <div style={{ 'backgroundImage': `url(${image3})`, width: '100%', height: '600px' }}>
          </div>
        </div>
        </Link>
        <Link to='/items/airConditioners'>  
        <div className="each-slide">
          <div style={{ 'backgroundImage': `url(${image4})`, width: '100%', height: '600px' }}>
          </div>
        </div>
        </Link>
      </Slide>
    </div>
  )
}

export default Caruosel