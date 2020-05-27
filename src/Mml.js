import React, {useCallback, useEffect, useRef, useState} from "react";

function Mml(props) {
    const player = useRef(null);
    const refs = useRef(props.videos.map(() => React.createRef()))

    const [ playerr, setPlayerr ] = useState({
        play: false,
        vrl: props.videos[0].link
    })

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
                <video
                    ref={refs.current[index]}
                    src={video.link}
                    loop
                    playsInline
                    muted={playerr.muted}
                    autoPlay={video.link === playerr.vrl}
                    className={'child'}
                    key={video._id}/>
            ))}
        </div>
    );
}

export default Mml