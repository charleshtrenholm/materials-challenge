import React, { useState } from 'react';
import './App.css';
import data from './bandstructure_mp-510625.json';
import data_v2 from './bandstructure_mp-510625_v2.json';
import BandStructureChart from './components/BandStructureChart';
import SelectedItemDisplay from './components/SelectedItemDisplay';

function App() {

  const [selectedElement, setSelectedElement] = useState(null);

  console.log('data', data);
  return (
      <>
        <BandStructureChart data={data_v2} setSelectedElement={setSelectedElement}></BandStructureChart>
        {selectedElement &&
          <SelectedItemDisplay itemData={selectedElement}></SelectedItemDisplay>
        }
      </>
  );
}

export default App;
