import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useMarvelServices from '../../sevices/MarvelServices'
import Spiner from '../Spiner/Spiner'
import Error from '../Error/Error'


export default function SingleDetailPage({ Component, type }) {
    const { id } = useParams()
    const [data, setData] = useState(null)
    console.log(useParams());
    useEffect(() => {
        updateData()
    }, [id])

    const { loading, error, getComicById, getCharacterById, clearError } = useMarvelServices()

    const updateData = () => {
        clearError()

        switch (type) {
            case 'character':
                getCharacterById(id)
                    .then(setData)
                break;

            case 'comic':
                getComicById(id)
                    .then(setData)
                break;
        }
    }

    const errorImage = error ? <Error /> : null
    const spiner = loading ? <Spiner /> : null
    const content = !(error || loading || !data) ? <Component data={data} /> : null

    return (
        <>
            {errorImage}
            {spiner}
            {content}
        </>
    )
}
