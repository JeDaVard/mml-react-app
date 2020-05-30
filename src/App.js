import React, {useEffect, useState} from 'react';
import './App.css';
import Mml from "./Mml";
import Loading from "./Loading/Loading";

function App(props) {
    const [ data, setData ] = useState({
        isAdding: false,
        loading: false,
        data: []
    });

    const [ uploadFile, setUploadFile ] = useState(null);

    const [mml, setMml ] = useState(false)
    const handleTik = e => {
        setMml(true)
    }

    useEffect(() => {
        setData(prev => ({...prev, loading: true}))
        fetch(`${process.env.REACT_APP_SERVER}/api/videos`)
            .then(response => response.json())
            .then(json => setData({
                ...data,
                loading: false,
                data: json
            }))
    }, [])

    const fileInputChangeHandler = e => {
        const uploadData = e.target.files[0];
        setUploadFile(uploadData)
    }

    const postVideo = e => {
        e.preventDefault();

        if (!uploadFile || uploadFile.type.toLowerCase() !== 'video/mp4') return console.log('Only mp4 allowed');
        setData(state => ({...state, loading: true}))
        const video = new FormData();
        video.append('file', uploadFile)

        fetch(`${process.env.REACT_APP_SERVER}/api/videos`, {
            method: 'POST',
            body: video,
            mode: 'cors'
        })
            .then(response => response.json())
            .then(json => {
                setData({
                    ...data,
                    loading: false,
                    data: json
                })
            })
            .catch(e => console.log('error', e))
    }

    return (
        <>
            {
                mml
                    ?
                <Mml videos={data.data.data} />
                :
                <div className={'start'}>
                    <h1>MML</h1>
                    <button onClick={handleTik} className={'startbutton'}>&nbsp;&nbsp;►&nbsp;&nbsp;</button>
                    {data.isAdding ? (
                        <form onSubmit={postVideo} className={'form'}>
                            {data.loading ? (
                                    <div className={'loadingPos'}>
                                        <Loading />
                                    </div>
                            ) : (
                                <>
                                    <input type="file" name={'video'} onChange={fileInputChangeHandler} className={'fileInput'}/>
                                    <button className={'uploadButton'} type={'submit'}>Add video</button>
                                </>
                            )}
                         </form>
                    ) : (
                        <button className={'addVideo'} onClick={() => setData({...data, isAdding: true})}>ADD VIDEO</button>
                    )}
                </div>
            }
        </>
    )
}

export default App;
