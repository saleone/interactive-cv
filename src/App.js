import DisclaimerSlide from './slides/Disclaimer';
import SlideController from './SlideController';

/* Entrypoint component to the React application */
function App() {
  return (
    <div className="items-center justify-center flex flex-col bg-white text-black dark:bg-black dark:text-white min-h-screen font-serif">
      <SlideController>
        <DisclaimerSlide/>
      </SlideController>
    </div>
  );
}

export default App;
