import React, { useState, useEffect } from 'react';

const App = props => {
  const [array, setArray] = useState();

  useEffect(
    () => {
      const fetchPosts = async () => { fetch('http://localhost:4000/api/posts')
        .then(result => result.json())
        .then(result => { setArray(result) })
        .catch(error => { 
          const myError = error.json();
          setArray(myError); }
        )
      };
      fetchPosts();
    },
    []
  );



  useEffect(
    () => {
      console.log(array);
    },
    [array]
  );

  return (
    <div>
    { array
      ? <code>
          <pre>
            {JSON.stringify(array, null, 2)}
          </pre>
        </code>
      : <p>Loading...</p> }
    </div>
  );
};

export default App;


