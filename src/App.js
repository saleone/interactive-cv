import SlideController from './SlideController';
import AlbumSlide from './slides/Album';
import MatrixTerminalSlide from './slides/MatrixTerminal';

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
        <AlbumSlide 
          photos={albumPhotos}
          startMessage="Album ready."
          continueMessage="Photo ready."
        />
        <MatrixTerminalSlide 
          careerTexts={terminalTexts}
          terminalUser="sasa@portfolio.savic.ba"
          streamingMessage="streaming..."
          readyMessage="ready"
          endMessage="end of transmission"
        />
        <h1>Thank you!</h1>
      </SlideController>
    </div>
  );
}

export default App;
