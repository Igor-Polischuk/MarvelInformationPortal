import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useMarvelServices from '../../sevices/MarvelServices'

import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'

import './ComicsList.scss'

export default function ComicsList() {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(2000)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)

    const { getAllComics, loading, error } = useMarvelServices()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial = false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
            .then(onComicsListLoaded)


    }

    const onComicsListLoaded = newComicsList => {
        let ended = newComicsList.length < 8


        setComics(prev => [...prev, ...newComicsList])
        setNewItemLoading(false)
        setOffset(prev => prev + 8)
        setComicsEnded(ended)
    }

    const spiner = loading && !newItemLoading ? <Spiner /> : null
    const err = error ? <Error /> : null

    return (
        <>
            {err}
            {spiner}
            <ul className="comics">
                <TransitionGroup component={null}>
                    {comics.map(({ id, title, thumbnail, price }) => {
                        return (
                            <CSSTransition key={id} timeout={500} classNames="comics__item">
                                <ComicsItem id={id} title={title} thumbnail={thumbnail} price={price} />
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </ul>
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

function ComicsItem({ id, title, thumbnail, price }) {
    return (
        <li className='comics__item'>
            <Link to={`${id}`}>
                <img tabIndex={0} src={thumbnail} alt={`${title} comics cover`} className="comics__cover" />
                <p className="comics__title">{title}</p>
                <p className="comics__price">{`${price}$`}</p>
            </Link>
        </li>
    )
}