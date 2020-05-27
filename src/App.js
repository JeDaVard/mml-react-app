import React, {useEffect, useState} from 'react';
import './App.css';
import Mml from "./Mml";

function App(props) {
    const [ data, setData ] = useState({
        loading: false,
        data: []
    });
    const [mml, setMml ] = useState(false)
    const handleTik = e => {
        setMml(true)
    }

    useEffect(() => {
        setData(prev => ({...prev, loading: true}))
        fetch(`${process.env.REACT_APP_SERVER}/api/videos`)
            .then(response => response.json())
            .then(json => setData({
                loading: false,
                data: json
            }))
    }, [])

    return (
        <>
            {
                mml
                    ?
                !data.loading && <Mml videos={data.data.data} />
                :
                <div className={'start'}>
                    <h1>MML</h1>
                    <button onClick={handleTik}>&nbsp;&nbsp;►&nbsp;&nbsp;</button>
                </div>
            }
        </>
    )
}

export default App;
