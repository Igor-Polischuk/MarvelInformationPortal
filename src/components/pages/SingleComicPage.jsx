import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './SinglePage.scss'

export default function SingleComicPage({ data }) {
    const { title, price, descr, thumbnail, pages, languages } = data

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title}`}
                />
                <title>{title}</title>
            </Helmet>
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
        </>
    )
}