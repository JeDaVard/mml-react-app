import React, { useCallback, useEffect, useRef, useState } from "react";

function Mml(props) {
    const player = useRef(null);
    const refs = useRef(props.videos.map(() => React.createRef()))

    const [ playerr, setPlayerr ] = useState({
        play: false,
        vrl: props.videos[0].link
    })

    // const [state, setState] = useState(props.videos.map(video => video.link))

    const handleScroll = useCallback(e => {
        setPlayerr({...playerr, muted: false})
        refs.current.forEach(ref => {
            const y = ref.current.getBoundingClientRect().y;
            if (y <= 20 && y >= -20) {
                ref.current.play()
            }  else if ((y > 20 && y < 500) || (y < -20 && y > -500)) {
                if (!ref.current.paused) {
                    ref.current.pause()
                }
            } else {
                ref.current.currentTime = 0;
            }
        })
    }, [playerr])

    useEffect(() => {
        const videoPlayerParent = player.current;

        videoPlayerParent.addEventListener('scroll', handleScroll)
        return () => videoPlayerParent.removeEventListener('scroll', handleScroll)
    }, [handleScroll]);


    return (
        <div ref={player} className="parent" dir="ltr">
            {props.videos.map((video, index) => (
                <div className={'child'} key={video.link}>
                    <video
                        ref={refs.current[index]}
                        src={video.link}
                        loop
                        playsInline
                        poster={video.link.slice(0, video.link.length-4) + '.thumb.jpg'}
                        preload="none"
                        muted={playerr.muted}
                        autoPlay={video.link === playerr.vrl}
                        className={'video'}
                        key={video._id}/>
                </div>
            ))}
        </div>
    );
}

export default Mml