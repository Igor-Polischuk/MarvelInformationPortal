import { useState, useEffect } from 'react'
import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'
import useMarvelServices from '../../sevices/MarvelServices'

import './randomChar.scss'

import mjolnir from '../../resource/img/mjolnir.png'


function RandonChar(){
    const [char, setChar] = useState({})

    const {loading, error, getCharacterById, clearError} = useMarvelServices()
    
    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }


    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacterById(id)
            .then(onCharLoaded)
    }

    const errorImage = error ? <Error/> : null
    const spiner     = loading ? <Spiner/> : null
    const content    = !(error || loading) ?  <Viev char={char}/> : null

    return (
        <div className="randomchar">
            {errorImage}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">Random character for today! <br/> Do you want to get to know him better?</p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">TRY IT</div>
                </button>
                <img src={mjolnir} alt="decorative image, mjolnir" className="randomchar__decorative-img" />
            </div>
        </div>
    )
}

function Viev({char}){
    const {name, descr, thumbnail, homepage, wiki} = char
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={`${name} image`} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <div className="randomchar__descr">
                    {descr}   
                </div>
                <div className="randomchar__btns">
                    <a href={homepage} target="_blank" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} target="_blank" className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandonChar