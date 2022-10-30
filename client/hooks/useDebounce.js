export default function useDebounce(cb, delay = 1000) {
    let timeOut
    return (...args) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(()=>{cb(...args)}, delay)
    }
}