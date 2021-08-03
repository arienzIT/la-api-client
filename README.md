# la-api-client
This module that contains all the necessary to effectively communicate with the back-end related API infrastructure.

## Client
The client folder is responsible for containing the api client itself and all relative infrastructure classes needed to deal with requests and responses.

### Call
The call folder contains an abstract class that all below explained API call classes should extend in order to work properly. Its constructor takes in the payload object and exposes a `performCall` method that is the one to be implemented in order to fire the API call itself.

### Response
The response folder contains all the handlers that can be used in order to correctly parse the API response (e.g. there should be a handler for dealing with collection or single entity objects).

Each handler takes in an optional `parser` parameter in its constructor that can be used to map the response object fields into **domain objects**.

The `handle` method exposed by each handler is then used under the hood by the `APIClient` itself, therefore it will automatically be able to access the response object.

### APIClient
This class exposes a single static `exec` method that takes in both a Call class (that should implement the previously described `APICallAbstract`) and a response handler.

What this method actually does is in order:
1) It invokes the call's `performCall` method (that fires the API request using our own `axios instance`)
2) It calls the provided handler `handle` method passing the call response as its parameter.

If the call encounters any error during the execution, the promise returned by axios gets rejected normally.

### Calls
As mentioned above, each call class should implement [APICallAbstract](#call).
The `performCall` method has to be implemented to wrap the axios request and should return the axios promise itself.

### Service
Each module exposes a dedicated service that is in charge of exposing static methods that invoke the [APIClient](#APIClient) exec method by passing the call and the response handler. Therefore if what is needed is modifying the response formats, do not add any logic inside the service but let's refer to a dedicated [handler](#Response)


## Example
In this example we're gonna create a new api call to retrieve a collection of items using [odata protocol](https://www.odata.org/). For the sake of the example, let's assume that we need to retrieve a list of users.

1) Create a new folder under `src/api/modules` with the name of the entity we need to work with, in this case `users`.
2) Create a new  `calls` folder in the newly created one and add a `GetUsersCall.js` file. Appending the `Call` method at the end of the file is an internal convention to help us importing the correct file when needed, avoiding naming conflicts.
3) Instantiate a new call.
```js
import {AxiosClient} from "../../../client/AxiosClient";
import {APICallAbstract} from "../../../client/call/APICallAbstract";

export class GetUsersCall extends APICallAbstract {
    async performCall() {
        return axios.get('/odata/StandardResources/Users', {
            params: this.payload,
        })
    }
}
```
5) Create a `UserAPI` js service under `src/api/modules/users` and let's define a new class and a static `getCollection` method.
```js
import {APIClient} from "../../client/APIClient";
import {GetUsersCall} from "./calls/GetConfigurationCall";
import {ODataCollectionResponseHandler} from "../../client/responses/ODataCollectionResponseHandler";
import {UserParser} from "../../../domain/modules/users/UserParser";

export class UsersAPI {
    static getCollection(payload) {
        return APIClient.exec(
            new GetUsersCall(payload),
            new ODataCollectionResponseHandler(UserParser)
        )
    }
}
```
6) You can import this service wherever you need to and use its methods to fire the newly created API call.
```js
import { UsersAPI } from '../../modules/users/UsersAPI'
export const Component = () => {
    const [query, setQuery] = useState();
    
    useEffect(async () => {
        const response = await UsersAPI.getCollection(query)
    }, [query])
}
```



