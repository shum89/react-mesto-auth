import React from 'react';
import {Link} from "react-router-dom";
import {giphy} from '../utils/GiphyApi';

function Page404() {
    /**
     * state for gif src
     */
    const [gif, setGif] = React.useState('');

    /**
     * request for a random gif
     */
    const randomGifRequest = () =>  {
        giphy.fetchData()
            .then((res) => {
                setGif(res.data.embed_url);
            }).catch((err) => {
            console.log(err)
        })
    }


    /**
     * request for a random gif on loading
     */
    React.useEffect(() => {
        randomGifRequest();
    },[])


    return (
        <div className='page404'>
        <h1 className='page404__title'>404</h1>
        <p className='page404__subtitle'>Здесь можно немного отдохнуть</p>
            <div className='page404__coub-wrap'>
                <iframe className='page404__gif' title='random gif' src={gif} allowFullScreen/>
            </div>

<div className='page404__button-container'>
    <Link to='/' className='page404__button'>Вернуться на Mesto</Link>
    <button className='page404__button'  onClick={randomGifRequest}>Позалипать на собачек</button>
</div>

            </div>
    )
}

export default Page404;