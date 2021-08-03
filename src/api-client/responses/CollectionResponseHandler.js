import { ResponseHandlerAbstract } from './ResponseHandlerAbstract'

export class Collection {
    items;
    totalItems;
}

export class CollectionResponseHandler extends ResponseHandlerAbstract {
    handle (response) {
        const collection = new Collection()
        collection.items = response.data.map(item => this.parser.parse(item))
        collection.totalItems = response.data.length

        return collection
    }
}
