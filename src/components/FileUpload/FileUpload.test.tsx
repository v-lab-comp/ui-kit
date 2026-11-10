import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FileDropZone, FileUploadField, FileUploadItem, type UploadFile } from './FileUpload'

const uploading: UploadFile = {
  id: '1',
  name: 'report.pdf',
  sizeLabel: '1 MB',
  status: 'uploading',
  progress: 45,
}

describe('FileDropZone', () => {
  it('нет role="button" с вложенной кнопкой; группа названа подписью поля', () => {
    const { container } = render(<FileDropZone label="Паспорт" onFiles={() => {}} />)
    expect(screen.getByRole('group', { name: 'Паспорт' })).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(container.querySelector('[role="button"] button')).toBeNull()
  })

  it('compact: сама зона — кнопка, открывается с клавиатуры', async () => {
    const user = userEvent.setup()
    const { container } = render(<FileDropZone size="compact" onFiles={() => {}} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const click = vi.spyOn(input, 'click')
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(click).toHaveBeenCalled()
  })
})

describe('FileUploadItem', () => {
  it('прогресс — progressbar с именем файла; кнопки названы с именем файла', () => {
    render(<FileUploadItem file={uploading} />)
    const bar = screen.getByRole('progressbar', { name: 'report.pdf' })
    expect(bar).toHaveAttribute('aria-valuenow', '45')
    expect(screen.getByRole('button', { name: 'Удалить файл report.pdf' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Скачать файл report.pdf' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Загрузка...')
  })
})

describe('FileUploadField', () => {
  it('прогресс и статус берутся из пропа files, без симуляции', async () => {
    const user = userEvent.setup()
    const onFilesChange = vi.fn()
    function Demo() {
      const [files, setFiles] = useState<UploadFile[]>([])
      return (
        <FileUploadField
          files={files}
          newFileStatus="uploading"
          onFilesChange={(next, native) => {
            onFilesChange(next, native)
            setFiles(next)
          }}
        />
      )
    }
    const { container } = render(<Demo />)
    const file = new File(['x'], 'a.pdf', { type: 'application/pdf' })
    await user.upload(container.querySelector('input[type="file"]') as HTMLInputElement, file)
    expect(onFilesChange).toHaveBeenCalledTimes(1)
    expect(onFilesChange.mock.calls[0]![1]).toEqual([file])
    expect(screen.getByRole('progressbar', { name: 'a.pdf' })).toHaveAttribute('aria-valuenow', '0')
    await new Promise((r) => setTimeout(r, 200))
    expect(onFilesChange).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'Удалить файл a.pdf' }))
    expect(onFilesChange).toHaveBeenLastCalledWith([], [])
  })

  it('неконтролируемый режим: новые файлы по умолчанию «done»', async () => {
    const user = userEvent.setup()
    const { container } = render(<FileUploadField />)
    await user.upload(
      container.querySelector('input[type="file"]') as HTMLInputElement,
      new File(['x'], 'b.png')
    )
    expect(screen.getByRole('status')).toHaveTextContent('Готово')
    expect(screen.queryByRole('progressbar')).toBeNull()
  })
})
