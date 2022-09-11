import React, { useState } from "react";
import { Helmet } from "react-helmet";


import RandonChar from "../RandomChar/RandomChar"
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import CharSearch from "../CharSearch/CharSearch";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default function MainPage() {
    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = id => {
        setSelectedChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel indormation portal"
                />
                <title>Marvel DB</title>
            </Helmet>
            <RandonChar />
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearch />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}