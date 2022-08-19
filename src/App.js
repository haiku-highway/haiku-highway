import './App.css';
import axios from 'axios';
import {useEffect} from 'react';

// <Header />
  // h1
  // nav
    //'how to' button

// <HowTo />

// <Credits />

// <UserInput />
  // form 
    // label
      // h2
    // input

// <DisplayHaiku />
  // section
    // hidden p with error message
    // ul
      // li * 3

// <WordSelect />
  // ul
    // li *(as needed)
      // button
  // hidden div with no results message

// <CompleteHaiku />
  // button

function App() {
  useEffect(() => {
    axios({
      url: "https://api.datamuse.com/words",
      method: "GET",
      dataResponse: "json",
      params: {
        lc: "oranges",
        md: "s",
      }
    }).then((res) => {
      const wordArr = res.data;
      wordArr.forEach((word) => {
        console.log(word);
      })
    })
  }, [])

  return (
    <div>

    </div>
  );
}

export default App;
