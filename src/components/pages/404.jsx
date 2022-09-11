import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import image404 from '../../resource/img/404.svg'

export default function Page404() {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="404 page"
                />
                <title>404</title>
            </Helmet>
            <div className="errorPage" style={style}>
                <img src={image404} alt="Image 404" style={{ maxWidth: 600 }} />
                <h1 style={{ fontSize: 36 }}>Page doesn't exist</h1>
                <Link to='/' className='header__menu-link'>Go to home page</Link>
            </div>
        </>
    )
}