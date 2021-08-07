import { CarouselProvider, ImageWithZoom, Slide, Slider} from 'pure-react-carousel';
import s from 'pure-react-carousel/dist/react-carousel.es.css';

//zoom by npm
const ZoomItem = (props) => {
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={0.5}
      step={7}
      naturalSlideWidth={3}
      naturalSlideHeight={2.5}
      hasMasterSpinner
    >
      <div>
      <Slider className={s.slider}> 
        <Slide index={1} >
          <ImageWithZoom src={props.image} />         
        </Slide>
      </Slider>
      </div>
    </CarouselProvider>
    
  )
    
}

export default ZoomItem