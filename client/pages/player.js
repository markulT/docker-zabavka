import {useSelector} from "react-redux";
import {useEffect} from "react";
import Head from 'next/head'

export default function Player() {
    const currentPlayer = useSelector(state => state.videoReducer.videoPlayer)
    const videoUrl = useSelector(state=>state.videoReducer.videoUrl)
    console.log(videoUrl)
    const editedString = currentPlayer.match(/<body>[\s\S*]*<\/body>/gmis)

    // const styleSheet = currentPlayer.match(/href="[\s\S]*?"/gmi)[0].slice(6).slice(0,-1)
    // const playerScripts = currentPlayer.match(/src=".*?"/gmi).map(elem=>elem.slice(5).slice(0,-1))



    useEffect(() => {
        // let editedString = currentPlayer.match(/<body>[\s\S*]*<\/body>/gmis)


    }, [])
    // return (
    //     <>
    //         <Head>
    //             <link rel="stylesheet" href={`http://193.176.179.12:8880${styleSheet}`}/>
    //             <script type={'text/javascript'} src={`http://193.176.179.12:8880${playerScripts[0]}`}></script>
    //             <script type={'text/javascript'} src={`http://193.176.179.12:8880${playerScripts[1]}`}></script>
    //             <script type={'text/javascript'} src={`http://193.176.179.12:8880${playerScripts[2]}`}></script>
    //         </Head>
    //         <div dangerouslySetInnerHTML={{__html: editedString}} className="ANCHOR_CLASS"></div>
    //     </>
    // )
    return (
        <>
            <iframe src={videoUrl} width={"100%"} height={"100vh"}></iframe>
        </>
    )
}