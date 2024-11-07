// App.js
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './navigation'; 
import './styles/tooted.css';

function App() {
    const [tooted, setTooted] = useState([]);
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const isActiveRef = useRef();

    useEffect(() => {
        fetch("https://localhost:7124/api/tooted")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then(json => setTooted(json))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    function kustuta(index) {
        fetch(`https://localhost:7124/api/tooted/${index}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to delete product");
                }
                return res.json();
            })
            .then(json => setTooted(json))
            .catch(error => console.error("Error deleting product:", error));
    }

    function lisa() {
        const uusToode = {
            id: Number(idRef.current.value),
            name: nameRef.current.value,
            price: Number(priceRef.current.value),
            isActive: isActiveRef.current.checked
        };

        fetch("https://localhost:7124/api/tooted/lisa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uusToode)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add product");
                }
                return res.json();
            })
            .then(json => setTooted(json))
            .catch(error => console.error("Error adding product:", error));
    }

    function dollariteks() {
        const kurss = 1.1;
        fetch(`https://localhost:7124/api/tooted/hind-dollaritesse/${kurss}`, { method: "PATCH" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to convert prices");
                }
                return res.json();
            })
            .then(json => setTooted(json))
            .catch(error => console.error("Error converting prices:", error));
    }

    return (
        <div className="App">
            <Navigation /> {}

            <h2>Lisa Toode</h2>
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Hind</label> <br />
            <input ref={priceRef} type="number" /> <br />
            <label>Aktiivne</label> <br />
            <input ref={isActiveRef} type="checkbox" /> <br />
            <button onClick={lisa}>Lisa</button>

            <h2>Tooted</h2>
            <div className='tooted-list'>
            {tooted.map((toode, index) => (
                <div key={toode.id} className='toode-item'>
                    <div><strong>ID:</strong> {toode.id}</div>
                    <div><strong>Nimi:</strong> {toode.name}</div>
                    <div><strong>Hind:</strong> {toode.price}</div>
                    <button onClick={() => kustuta(index)}>Kustuta</button>
                </div>
            ))}
            </div>

            <button onClick={dollariteks}>Muuda dollariteks</button>
        </div>
    );
}

export default App;
