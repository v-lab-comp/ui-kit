/**
 * PhoneInput и утилиты для работы с номерами телефонов.
 *   import { PhoneInput } from '@v-lab/ui-kit/phone'
 *
 * Требует установки peer-зависимостей:
 *   libphonenumber-js, react-phone-number-input
 */
export {
  PhoneInput,
  getPhoneCountryOptions,
  getCountries,
  getMaxNationalLength,
  getPlaceholderForCountry,
} from './components/inputs/PhoneInput'
export type { PhoneInputProps } from './components/inputs/PhoneInput'
export type { PhoneLocale } from './components/inputs/PhoneInput'
