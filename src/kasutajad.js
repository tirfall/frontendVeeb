import { useEffect, useRef, useState } from 'react';
import './styles/index.css';
import Navigation from './navigation';

function Kasutajad() {
    const [kasutajad, setKasutajad] = useState([]);
    const idRef = useRef();
    const kasutajanimiRef = useRef();
    const paroolRef = useRef();
    const eesnimiRef = useRef();
    const perenimiRef = useRef();

    // Fetch users from the API on component mount
    useEffect(() => {
        fetch("https://localhost:7044/api/kasutaja")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }
                return res.json();
            })
            .then(json => setKasutajad(json))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    // Delete a user by ID
    function kustuta(id) {
        fetch(`https://localhost:7044/api/kasutaja/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to delete user");
                }
                return res.json();
            })
            .then(json => setKasutajad(json))
            .catch(error => console.error("Error deleting user:", error));
    }

    // Add a new user
    function lisa() {
        const uusKasutaja = {
            id: Number(idRef.current.value),
            kasutajanimi: kasutajanimiRef.current.value,
            parool: paroolRef.current.value,
            eesnimi: eesnimiRef.current.value,
            perenimi: perenimiRef.current.value,
        };

        fetch("https://localhost:7044/api/kasutaja/lisa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uusKasutaja)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add user");
                }
                return res.json();
            })
            .then(json => {
                setKasutajad(json); // Update the state to display all users, including the new one

                // Clear the input fields after successfully adding a user
                idRef.current.value = '';
                kasutajanimiRef.current.value = '';
                paroolRef.current.value = '';
                eesnimiRef.current.value = '';
                perenimiRef.current.value = '';
            })
            .catch(error => console.error("Error adding user:", error));
    }

    return (
        <div className="Kasutajad">
            <h2>Lisa Kasutaja</h2>
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>Kasutajanimi</label> <br />
            <input ref={kasutajanimiRef} type="text" /> <br />
            <label>Parool</label> <br />
            <input ref={paroolRef} type="password" /> <br />
            <label>Eesnimi</label> <br />
            <input ref={eesnimiRef} type="text" /> <br />
            <label>Perenimi</label> <br />
            <input ref={perenimiRef} type="text" /> <br />
            <button onClick={lisa}>Lisa</button>

            <h2>Kasutajad</h2>
            <div className="kasutaja-list">
                {kasutajad.map((kasutaja) => (
                    <div key={kasutaja.id} className="kasutaja-item">
                        <div><strong>ID:</strong> {kasutaja.id}</div>
                        <div><strong>Kasutajanimi:</strong> {kasutaja.kasutajanimi}</div>
                        <div><strong>Eesnimi:</strong> {kasutaja.eesnimi}</div>
                        <div><strong>Perenimi:</strong> {kasutaja.perenimi}</div>
                        <button onClick={() => kustuta(kasutaja.id)}>Kustuta</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Kasutajad;
