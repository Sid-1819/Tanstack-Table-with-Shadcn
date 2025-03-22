import React from 'react';
import TanstackTable from './components/table-components/table-content';
import tableData from './data/table-data';

function App() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
     <TanstackTable data={tableData}/>
    </div>
  );
}

export default App;
