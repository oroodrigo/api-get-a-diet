import { describe, expect, it } from 'vitest'
import { verifyCRNSubscription } from './verifyCRNSubscription'

const validCRN = '93100119'
const invalidCRN = '4170D'

describe('Check CRN Function', () => {
  it('should be able to check if CRN is valid.', async () => {
    const result = await verifyCRNSubscription(validCRN)

    expect(result?.valid).toBe(true)
    expect(result).toStrictEqual({
      valid: true,
      nutricionist: {
        crn: expect.any(String),
        lastUpdated: expect.any(String),
        name: expect.any(String),
        situation: expect.any(String),
        subscription: Number(validCRN),
        subscriptionType: expect.any(String),
      },
    })
  })

  it('should be able to check if CRN is invalid.', async () => {
    const result = await verifyCRNSubscription(invalidCRN)

    expect(result?.valid).toBe(false)
  })

  it('should return null when subscription parameter is null', async () => {
    const result = await verifyCRNSubscription(null)

    expect(result).toBe(null)
  })
})
