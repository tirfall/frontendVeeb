import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    const [tooted, setTooted] = useState([]);
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const isActiveRef = useRef();
    const [isUsd, setUsd] = useState(false);

    useEffect(() => {
        fetch("https://localhost:4444/Tooted")
            .then(res => res.json())
            .then(json => setTooted(json));
    }, []);

    function kustuta(index) {
        fetch("https://localhost:4444/Tooted/kustuta/" + index)
            .then(res => res.json())
            .then(json => setTooted(json));
    }

    function lisa() {
        fetch(`https://localhost:4444/Tooted/lisa/${Number(idRef.current.value)}/${nameRef.current.value}/${Number(priceRef.current.value)}/${isActiveRef.current.checked}`)
            .then(response => response.json())
            .then(json => setTooted(json))
            .catch(error => console.error('Error:', error));
    }

    function dollariteks() {
        const kurss = 1.1;
        setUsd(true);
        fetch("https://localhost:4444/Tooted/hind-dollaritesse/" + kurss)
            .then(res => res.json())
            .then(json => setTooted(json));
    }

    function eurodeks() {
        const kurss = 0.9091;
        setUsd(false);
        fetch("https://localhost:4444/Tooted/hind-dollaritesse/" + kurss)
            .then(res => res.json())
            .then(json => setTooted(json));
    }

    return (
        <div className="App">
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>name</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>price</label> <br />
            <input ref={priceRef} type="number" /> <br />
            <label>isActive</label> <br />
            <input ref={isActiveRef} type="checkbox" /> <br />
            <button onClick={() => lisa()}>Lisa</button>
            {tooted.map((toode, index) =>
                <div>
                    <div>{toode.id}</div>
                    <div>{toode.name}</div>
                    <div>{toode.price.toFixed(2)}</div>
                    <button onClick={() => kustuta(index)}>x</button>
                </div>)}
            {isUsd === false && <button onClick={() => dollariteks()}>Muuda dollariteks</button>}
            {isUsd === true && <button onClick={() => eurodeks()}>Muuda eurodeks</button>}
        </div>
    );
}

export default App;