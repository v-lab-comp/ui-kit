/**
 * Значение селекта для отправки нативной формы: `<input type="hidden">` на каждое значение
 * (одиночный выбор — ровно одно поле, пустое значение — `''`). Без `name` ничего не рисует.
 */
export function SelectFormFields({
  name,
  values,
  form,
}: {
  name?: string
  values: readonly string[]
  form?: string
}) {
  if (!name) return null
  return (
    <>
      {values.map((value, index) => (
        <input key={`${index}-${value}`} type="hidden" name={name} value={value} form={form} />
      ))}
    </>
  )
}
