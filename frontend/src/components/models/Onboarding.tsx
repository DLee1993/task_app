import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Onboarding = () => {
    return (
        <CarouselProvider naturalSlideHeight={100} naturalSlideWidth={100} totalSlides={4} isIntrinsicHeight={true}>
            <Slider>
                <Slide index={0} className="first_slide slide">
                    First slide
                </Slide>
                <Slide index={1} className="first_slide slide">
                    second slide
                </Slide>
                <Slide index={2} className="first_slide slide">
                    third slide
                </Slide>
                <Slide index={3} className="first_slide slide">
                    fourth slide
                </Slide>
            </Slider>
            <section className="slider_btns">
                <ButtonBack className="prev_btn">Back</ButtonBack>
                <ButtonNext className="next_btn">Next</ButtonNext>
            </section>
        </CarouselProvider>
    );
};

export default Onboarding;
