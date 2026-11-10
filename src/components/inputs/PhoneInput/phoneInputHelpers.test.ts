import { describe, expect, it } from 'vitest'
import {
  getAllowedCountries,
  getPhoneCountry,
  normalizePhoneValue,
  parseFullPhone,
} from './phoneInputHelpers'

describe('phoneInputHelpers', () => {
  describe('parseFullPhone', () => {
    it.each([
      ['+998 90 123 45 67', 'UZ', { country: 'UZ', e164: '+998901234567' }],
      ['998901234567', 'UZ', { country: 'UZ', e164: '+998901234567' }],
      ['90 123 45 67', 'UZ', { country: 'UZ', e164: '+998901234567' }],
      ['+7 912 345-67-89', 'UZ', { country: 'RU', e164: '+79123456789' }],
      ['8 (912) 345-67-89', 'RU', { country: 'RU', e164: '+79123456789' }],
    ] as const)('%s (%s)', (text, country, expected) => {
      expect(parseFullPhone(text, country)).toEqual(expected)
    })

    it.each(['90 123', '+998 901', 'abc', ''])('returns undefined for incomplete %j', (text) => {
      expect(parseFullPhone(text, 'UZ')).toBeUndefined()
    })
  })

  describe('normalizePhoneValue', () => {
    it.each([
      ['+998901234567', '+998901234567'],
      ['+9989', '+9989'],
      ['+998-901234567', '+998901234567'],
      ['+998 90 123-45-67', '+998901234567'],
      ['901234567', '+998901234567'],
    ])('%s → %s', (value, expected) => {
      expect(normalizePhoneValue(value, 'UZ')).toBe(expected)
    })

    it('keeps partial number typed for a country with shared calling code', () => {
      expect(normalizePhoneValue('+7912', 'KZ')).toBe('+7912')
    })

    it.each([undefined, '', 'abc', '+79123456789'])('returns undefined for %j', (value) => {
      expect(normalizePhoneValue(value, 'UZ')).toBeUndefined()
    })
  })

  it('getPhoneCountry', () => {
    expect(getPhoneCountry('+7 912 345 67 89', 'UZ')).toBe('RU')
    expect(getPhoneCountry('901234567', 'UZ')).toBe('UZ')
    expect(getPhoneCountry('abc', 'UZ')).toBeUndefined()
  })

  it('getAllowedCountries', () => {
    expect(getAllowedCountries(['UZ', 'XX' as never, 'RU'])).toEqual(['UZ', 'RU'])
    expect(getAllowedCountries([]).length).toBeGreaterThan(200)
  })
})
