export interface CalendarLocale {
  months: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
  weekdays: [string, string, string, string, string, string, string]
  /**
   * BCP 47 тег языка (`'ru'`, `'en-GB'`). По нему `Intl.DateTimeFormat` строит доступное имя дня
   * («понедельник, 3 марта 2025 г.»). Без тега имя собирается из `months`: «3 Март 2025».
   */
  code?: string
}

export const calendarLocales = {
  en: {
    code: 'en',
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  ru: {
    code: 'ru',
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  },
  uz: {
    code: 'uz',
    months: [
      'Yanvar',
      'Fevral',
      'Mart',
      'Aprel',
      'May',
      'Iyun',
      'Iyul',
      'Avgust',
      'Sentabr',
      'Oktabr',
      'Noyabr',
      'Dekabr',
    ],
    weekdays: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
  },
} satisfies Record<string, CalendarLocale>

export type BuiltinLocale = keyof typeof calendarLocales

export const defaultLocale = calendarLocales.en
