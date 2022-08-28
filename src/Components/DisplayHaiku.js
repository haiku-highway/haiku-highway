// Get the syllable count from props

// Create another state variable that tells us which line we are on. Whenever we run the syllable count we run a useEffect to verify where we are in the poem and notify user when to start the next line/the poem has been completed.

// Return the word count and render it onto the page
// As the line changes, display the next number of required syllables

// each word selected by the user will be dynamically printed into a paragraph and rrrrrendered on page
//{/* <p>{haiku.line1.join(" ")</p> */}

const DisplayHaiku = ({ haikuObject, currentLine }) => {
    return (
    <div>
        <p>{currentLine === 1 ? <span>* </span> : null}{haikuObject.line1.join(' ')}</p>
        <p>{currentLine === 2 ? <span>* </span> : null}{haikuObject.line2.join(' ')}</p>
        <p>{currentLine === 3 ? <span>* </span> : null}{haikuObject.line3.join(' ')}</p>
    </div>
    )
}

export default DisplayHaiku;