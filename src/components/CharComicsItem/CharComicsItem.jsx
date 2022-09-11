import {Link} from 'react-router-dom'

import './CharComixItem.scss'

function CharComicsItem({comicsName, comicsUrl}){
    const id = comicsUrl.split('/').pop()

    return (
        <li className="char-comics-item">
            <Link to={`comics/${id}`}>{comicsName}</Link>
        </li>
    )
}

export default CharComicsItem