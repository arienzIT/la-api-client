import { APIClient } from '@api/APIClient'

const call = {
  performCall: jest.fn()
}

const responseHandler = {
  handle: jest.fn().mockReturnValue('responses handled')
}

describe('APIClient', () => {
  it('should fire the provided api call', async () => {
    call.performCall.mockImplementationOnce(() => Promise.resolve('res'))
    const res = await APIClient.exec(call, responseHandler)

    expect(call.performCall).toHaveBeenCalled()
    expect(responseHandler.handle).toHaveBeenCalledWith('res')
    expect(res).toEqual('responses handled')
  })

  it('should reject the promise when an error occurs', async () => {
    const error = new Error()
    call.performCall.mockImplementationOnce(() => Promise.reject(error))
    await expect(APIClient.exec(call, responseHandler)).rejects.toEqual(error)
  })
})
