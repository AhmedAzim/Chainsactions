import React, { useState } from 'react';import Navbar from './components/Navbar';
import Search from './components/Search';
import Graph from './components/Graph'
import * as d3 from 'd3';

function App() {
  const [walletId, setWalletId] = useState('');
  return (
    <div className='body'>
      <Navbar />
      <Search setWalletId={setWalletId} />
      <Graph walletId={walletId} />
      </div>
    
  );
}

export default App;
