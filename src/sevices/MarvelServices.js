import { useHttp } from "../hooks/http.hook"


const useMarvelServices = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey  = "apikey=805a9ea1d5bda425496bffb3877330a0"
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await  request(`${_apiBase}characters?limit=9&=&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)//_transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            descr: comics.description ? comics.description : 'No description (',
            price: comics.prices[0].price,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            pages: comics.pageCount,
            languages: comics.textObjects.language || 'en-us',
            creators: comics.creators.items,
            characters: comics.characters.items

        }
    }

   const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacterById, getCharacterByName, clearError, getAllComics, getComicById}
}

export default useMarvelServices