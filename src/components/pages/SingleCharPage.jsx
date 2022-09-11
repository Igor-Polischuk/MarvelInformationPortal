import { Helmet } from 'react-helmet'
import './SinglePage.scss'

export default function SingleCharPage({ data }) {
    const { name, descr, thumbnail } = data

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="comicsPage">
                <img src={thumbnail} alt='Comics cover' className="comicsPage__cover" />
                <div className="comicsPage__descr">
                    <h1 className="comicsPage__title">{name}</h1>
                    <p className="comicsPage__descr">{descr}</p>
                </div>
            </div>
        </>
    )
}