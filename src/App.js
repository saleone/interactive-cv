import DisclaimerSlide from './slides/Disclaimer';
import SlideController from './SlideController';
import AlbumSlide from './slides/Album';
import MatrixTerminalSlide from './slides/MatrixTerminal';

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
        <DisclaimerSlide/>
        <AlbumSlide/>
        <MatrixTerminalSlide/>
        <h1>Thank you!</h1>
      </SlideController>
    </div>
  );
}

export default App;
