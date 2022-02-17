import './App.css';
import KommunicateChat from './chat';
import MapBox from './mapbox';

function App() {
  return (
    <>
      <div className="App">
        <MapBox />
      </div>
      <KommunicateChat />
    </>
  );
}

export default App;
