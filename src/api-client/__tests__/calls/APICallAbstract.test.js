import { APICallAbstract } from '@api/call/APICallAbstract'

const payload = { sample: 'test' }
const call = new APICallAbstract({ sample: 'test' })

describe('APICallAbstract', () => {
  it('should set payload property', () => {
    expect(call.payload).toEqual(payload)
  })

  it('should throw an error if the call does not implement the correct method', () => {
    expect(call.performCall).toThrowError()
  })
})
