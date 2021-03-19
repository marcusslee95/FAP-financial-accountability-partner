import { useHistory } from "react-router" //gets you the history of the urls / routes your user has been to on this site




const Welcome = () => {
    const history = useHistory()
    console.log(history)
    return (
        <div className='Welcome'>
            <div className='Header'>Welcome to Financial Accountability Partner (FAP for short) </div>
            <div className='Intro Video'>
            <iframe title="The Best Way to FAP is by #noFap" width="560" height="315" src="https://www.youtube.com/embed/wSF82AwSDiU" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className='Button' onClick={() => history.push('/login')}>Start Using FAP</div>
        </div>
    )
}

export default Welcome

