export class APICallAbstract {
  constructor (payload) {
    this.payload = payload || {}
  }

  performCall () {
    throw new Error('performCall should be implemented in a Call class')
  }
}
