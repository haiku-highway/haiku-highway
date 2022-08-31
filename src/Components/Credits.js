const Credits = () => {
    return (
        <section className="credits largePaper">
            <div className="largePaperText">
                <h2>credits</h2>
                <div className="creditsContainer">
                    <p>developed with datamuse api</p>
                    <p>
                        by{" "}
                        <a className="alix"
                        href="https://www.alixfaudot.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        alix
                        </a>
                        ,{" "}
                        <a className="corey"
                        href="https://www.coreydecaire.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        corey
                        </a>
                        ,{" "}
                        <a className="frances"
                        href="https://francesm.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        frances
                        </a>
                        {" "}&#38;{" "}
                        <a className="matt"
                        href="https://matthewrussell.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        matt
                        </a>
                    </p>
                    <p>
                        at{" "}
                        <a className="juno"
                        href="https://junocollege.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        juno college
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Credits;