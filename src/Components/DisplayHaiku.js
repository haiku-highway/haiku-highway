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