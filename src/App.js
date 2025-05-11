import DisclaimerSlide from './slides/Disclaimer';
import SlideController from './SlideController';
import AlbumSlide from './slides/Album';

/* Entrypoint component to the React application */
function App() {
  return (
    <div className="
           items-center justify-center flex flex-col 
           min-h-screen font-serif
           bg-white text-black 
           dark:bg-black dark:text-white 
         "
    >
      <SlideController>
        <AlbumSlide/>
      </SlideController>
    </div>
  );
}

export default App;
