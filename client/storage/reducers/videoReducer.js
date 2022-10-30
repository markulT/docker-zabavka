import * as axios from 'axios'

const SET_URL = "SET_URL"
const SET_VIDEO_PLAYER = "SET_VIDEO_PLAYER"

const initialState = {
    videoUrl:'',
    videoPlayer:""
}
export const videoReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_URL:
        return {
            ...state,
            videoUrl: action.url
        }
        case SET_VIDEO_PLAYER:
            return {
                ...state,
                videoPlayer:action.html
            }
        default:
            return state
    }
}
export const setUrl = (url) => ({type:SET_URL, url})
export const setVideoPlayer = (html) => ({type:SET_VIDEO_PLAYER, html})
export const getVideoUrl = () => async (dispatch) => {
    const response = await axios.get('https://testsoft.xyz/video.php')
    dispatch(setUrl(response.data))
}
export const getVideo = (url) => async (dispatch) => {
    const response = await axios.get(url,{"X-UserId":"20005000"})
    console.log(response.data)
    dispatch(setVideoPlayer(response.data))

}