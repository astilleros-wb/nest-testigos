import { 
    Language, 
    Transaction, 
    UrlType,
    Provider
} from "../../common/enums"
import { 
    Typology, 
    ExtraFeature, 
    Conservation,
} from "../../property/enums"

import { Range } from "./range.entity";
import turf from '@turf/turf'


export class Metadatum {

    providers?: Provider[]

    urlType?: UrlType

    detailId?: string

    languages?: Language[]

    transaction: Transaction

    typologies?: Typology[]

    conservations?: Conservation[]

    extraFeatures?: ExtraFeature[]

    surface?: Range

    bedrooms?: Range

    bathrooms?: Range

    rooms?: Range

    price?: Range

    geo?: turf.Polygon | turf.MultiPolygon

}