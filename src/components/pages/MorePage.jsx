import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'

import useMarvelServices from '../../sevices/MarvelServices'
import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'

import './SingleComicPage.scss'

export default function MorePage(props) {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    console.log(useParams());
    useEffect(() => {
        updateComic()
    }, [])

    const {loading, error, getComicById, clearError } = useMarvelServices()

    const updateComic = () => {
        clearError()
        getComicById(comicId)
            .then(comic => setComic(comic)) 
    }

    const errorImage = error ? <Error/> : null
    const spiner     = loading ? <Spiner/> : null
    const content    = !(error || loading || !comic) ?  <Viev comic={comic}/> : null

    return (
        <>
            {errorImage}
            {spiner}
            {content}
        </>
    )
}

const Viev = ({comic}) => {
    const {title, price, descr, thumbnail, pages, languages} = comic

    return (
        <div className="comicsPage">
            <img src={thumbnail} alt='Comics cover' className="comicsPage__cover" />
            <div className="comicsPage__descr">
                <h1 className="comicsPage__title">{title}</h1>
                <p className="comicsPage__descr">{descr}</p>
                <p className="comicsPage__pages">{pages} pages</p>
                <p className="comicsPage__lang">Language: {languages}</p>
                <p className="comicsPage__price">{price}$</p>
            </div>
            <div className='comicsPage__go-back'>
                <Link to='../comics' className="header__menu-link">Back to all</Link>
            </div>
        </div>
    )
}