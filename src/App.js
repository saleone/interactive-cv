import SlideController from './SlideController';
import AlbumSlide from './slides/Album';
import MatrixTerminalSlide from './slides/MatrixTerminal';
import TransitionSlide from './slides/TransitionSlide';

import { albumPhotos, terminalTexts } from './data';

/* Entrypoint component to the React application */
function App() {
  // Album slide data
  return (
    <div className="
      items-center justify-center flex flex-col 
      min-h-screen font-serif
      bg-white text-black 
      dark:bg-black dark:text-white 
    "
    >
      <SlideController>
        <h1 className="text-6xl m-12 overline decoration-double">Disclaimer</h1>
        <TransitionSlide 
          colorClasses={['bg-white dark:bg-black', 'bg-white dark:bg-white']}
          settleTime={800}
          initialFlickerSpeed={25}
        />
        <AlbumSlide 
          photos={albumPhotos}
          startMessage="Album ready."
          continueMessage="Photo ready."
        />
        <TransitionSlide 
          colorClasses={['bg-white dark:bg-black', 'bg-black', 'bg-green-500', 'bg-black']}
          settleTime={800}
          initialFlickerSpeed={25}
        />
        <MatrixTerminalSlide 
          careerTexts={terminalTexts}
          terminalUser="sasa@portfolio.savic.ba"
          streamingMessage="streaming..."
          readyMessage="ready"
          endMessage="end of transmission"
        />
        <TransitionSlide 
          colorClasses={['bg-black', 'bg-green-500', 'bg-white dark:bg-black']}
          settleTime={800}
          initialFlickerSpeed={25}
        />
        <h1 className="text-6xl underline">Thank You!</h1>
        <h1 className="text-6xl">Questions?</h1>
      </SlideController>
    </div>
  );
}

export default App;
