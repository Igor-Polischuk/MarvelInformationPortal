import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useMarvelServices from '../../sevices/MarvelServices'
import CharComicsItem from '../CharComicsItem/CharComicsItem'
import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'
import Skeleton from '../Skeleton/Skeleton'

import './CharInfo.scss'

function CharInfo(props){
    const [char, setChar] = useState(null)
    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const {loading, error, getCharacterById, clearError } = useMarvelServices()

    const updateChar = () => {
        const {charId} = props
        if(!charId){
            return
        }
        clearError()
        getCharacterById(charId)
            .then(char => setChar(char)) 
    }


    const skeleton   = char || loading || error ? null : <Skeleton/>
    const errorImage = error ? <Error/> : null
    const spiner     = loading ? <Spiner/> : null
    const content    = !(error || loading || !char) ?  <Viev char={char}/> : null

    return(
        <div className="char-info">
            {skeleton}
            {errorImage}
            {spiner}
            {content}
        </div>
    )
}

function    Viev({char}){
    const {name, descr, thumbnail, homepage, wiki, comics} = char
    return (
        <>
            <div className="char__header">
                <img src={thumbnail} alt={name + 'image'} />
                <div className="char__header-info">
                    <div className="char__header-name">{name}</div>
                    <div className="char__header__btn">
                        <a href={homepage} className="button button__main" target="_blanked"><div className="inner">homepage</div></a>
                        <a href={wiki} className="button button__secondary" target="_blanked"><div className="inner">wiki</div></a>
                    </div>
                </div>
            </div>
            <div className="char-info__descr">
                {descr}  
            </div>
            <p className="char__comics">comics:</p>
            <ul className="char-comics__list">
                {comics.length > 0 ? null : "There is no comics with this character : ("}
                {
                    comics.map((item, i) => {
                        if (i > 9) return
                        return <CharComicsItem 
                            comicsName={item.name}
                            comicsUrl={item.resourceURI}
                            key={i}/>
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo