import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group'

import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'

import useMarvelServices from '../../sevices/MarvelServices'

import './CharList.scss'



function CharList(props) {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(200)
    const [charEnded, setCharEnded] = useState(false)

    const { loading, error, getAllCharacters } = useMarvelServices()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const renderItems = arr => {
        const items = <TransitionGroup component={null}>
            {arr.map(({ name, thumbnail, id }) => {
            return (
                <CSSTransition key={id}  timeout={500} classNames="anim-item">
                    <li
                        className="charlist__item"
                        tabIndex={0}
                        onClick={() => props.onCharSelected(id)}
                        onKeyPress={e => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(id)
                            }
                        }}>
                        <img src={thumbnail} alt={thumbnail} className="char__img" />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )

        })}
        </TransitionGroup>
        return (
            <ul className="charlist">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)

    const errorImage = error ? <Error /> : null
    const spiner = loading && !newItemLoading ? <Spiner /> : null

    return (
        <div>
            {errorImage}
            {spiner}
            {items}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList