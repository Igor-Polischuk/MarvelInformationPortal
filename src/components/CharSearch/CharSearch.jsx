import { memo, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../sevices/MarvelServices';
import Error from '../Error/Error';
import './CharSearch.scss'

const CharSearch = () => {
    const { getCharacterByName, loading, error, clearError } = useMarvelServices()
    const [char, setChar] = useState(null)

    const onCharLoaded = char => {
        setChar(char)
    }

    const searchChar = async ({ charName }) => {
        clearError()
        getCharacterByName(charName)
            .then(onCharLoaded)
    }

    const result = !char ? null : char.length > 0 ? 
                    <div className="search-succes">
                        <p>There is! Visit {char[0].name} page?</p>
                        <Link to={`character/${char[0].id}`} className="button button__secondary"><div className="inner">to page</div></Link>
                    </div> : 
                    <p className='search-error'>The character was not found. Check the name and try again</p>

    const errorImage = error ? <Error/> : null
    
    return (
        <Formik initialValues={{ charName: '' }}
            validate={(values) => !values.charName ? {charName: 'This field is required'} : null}
            onSubmit={searchChar}>
            <Form className="charsearch">
                <label>Or find a character by name:</label>
                <div className='charsearch__panel'>
                    <Field className='charsearch__input' name="charName" type="text" placeholder='Enter name' />
                    <button className="charsearch__btn button button__main"
                        type='submit'
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <ErrorMessage component="p" className="search-error" name="charName" />
                {result}
                {errorImage}
            </Form>
        </Formik>
    );
};

export default memo(CharSearch)