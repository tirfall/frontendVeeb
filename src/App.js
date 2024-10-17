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
    fetch("https://localhost:7123/tooted")
        .then(res => res.json())
        .then(json => setTooted(json));
  }, []);

  function kustuta(index) {
    fetch("https://localhost:7123/tooted/kustuta/" + index)
        .then(res => res.json())
        .then(json => setTooted(json));
  }

    ////////////////////////
    function lisa() {
        const uusToode = {
            "id": Number(idRef.current.value),
            "name": nameRef.current.value,
            "price": Number(priceRef.current.value),
            "isActive": isActiveRef.current.checked
        }
        fetch("https://localhost:4444/tooted/lisa", {"method": "POST", "body": JSON.stringify(uusToode)})
            .then(res => res.json())
            .then(json => setTooted(json));
    }
    ////////////////////////

  function dollariteks() {
    const kurss = 1.1;
    setUsd(true);
    fetch("https://localhost:7123/tooted/hind-dollaritesse/" + kurss)
        .then(res => res.json())
        .then(json => setTooted(json));
  }

  function eurodeks() {
    const kurss = 0.9091;
    setUsd(false);
    fetch("https://localhost:7123/tooted/hind-dollaritesse/" + kurss)
        .then(res => res.json())
        .then(json => setTooted(json));
  }

    return (
        <div className="App">
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Hind</label> <br />
            <input ref={priceRef} type="number" /> <br />
            <label>Aktiivne</label> <br />
            <input ref={isActiveRef} type="checkbox" /> <br />
            <button onClick={() => lisa()}>Lisa</button>
            {tooted.map((toode, index) =>
                <div>
                    <div>{toode.id}</div>
                    <div>{toode.name}</div>
                    <div>{toode.price}</div>
                    <button onClick={() => kustuta(index)}>x</button>
                </div>)}
            <button onClick={() => dollariteks()}>Muuda dollariteks</button>
        </div>
    );
}

export default App;