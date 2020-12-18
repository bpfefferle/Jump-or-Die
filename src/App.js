import './App.css';
import './canvas.js';

function App() {
  return (
    <div className="App">
      <h1>Jump or Die</h1>
      <p>Mini React project for CPSC 349-02, developed by Brent Pfefferle.</p>
      <p>How to play: Press the "w" or up arrow on your keyboard to jump.</p>
      <button id="btnPlayGame">Play Game</button>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
