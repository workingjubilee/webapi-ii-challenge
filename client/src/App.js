import React, { useState, useEffect } from 'react';

const App = props => {
  const [array, setArray] = useState();

  useEffect(
  );



  useEffect(
    () => {
      console.log(array);
    },
    [array]
  );

  return (
    <div>
      <p>Hmm?<p>
    </div>
  );
};

export default App;


