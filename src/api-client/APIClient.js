export class APIClient {
  static async exec (Call, ResponseHandler) {
    try {
      const response = await Call.performCall()
      return ResponseHandler.handle(response)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
