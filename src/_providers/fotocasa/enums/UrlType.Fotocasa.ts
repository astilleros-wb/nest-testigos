import { UrlType } from "../../../common/enums"

export enum UrlTypeFotocasa {
    list = 'l',
    detail = 'd',
}

export const typeToCode: { [key: string]: UrlType } = {
    'l': UrlType.list, 
    'd': UrlType.detail,
}  

export const codetoType: { [key: number]: UrlTypeFotocasa } = {
    1: UrlTypeFotocasa.list, 
    2: UrlTypeFotocasa.detail
}