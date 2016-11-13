import Raw from './raw'

export interface ITextGetter {
    get(text: Raw) : Promise<Raw>
}
