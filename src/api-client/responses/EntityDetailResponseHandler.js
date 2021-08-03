import { ResponseHandlerAbstract } from './ResponseHandlerAbstract'

export class EntityDetailResponseHandler extends ResponseHandlerAbstract {
    handle (response) {
        return this.parser.parse(response.data)
    }
}
