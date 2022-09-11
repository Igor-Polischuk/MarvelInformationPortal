import ComicsList from "../ComicsList/ComicsList";
import { Helmet } from "react-helmet";

import avengers from '../../resource/img/Avengers.png'
import avengersLogo from '../../resource/img/Avengerslogo.png'

export default function ComicsPage() {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with marvel comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <div className="comicsList__header">
                <img src={avengers} alt="avengers" />
                <p>New comics every week! <br /> Stay tuned!</p>
                <img src={avengersLogo} alt="avengers" />
            </div>
            <ComicsList />
        </>
    )
}