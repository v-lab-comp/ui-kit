import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUploadField, FileUploadItem, fileToUploadFile } from './FileUpload'
import type { UploadFile } from './FileUpload'

const meta: Meta<typeof FileUploadField> = {
  component: FileUploadField,
  title: 'Components/FileUpload',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 1000, padding: '0 20px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FileUploadField>

export const Playground: Story = {
  render: function Render(args) {
    const [files, setFiles] = useState<UploadFile[]>([])

    return <FileUploadField {...args} files={files} onFilesChange={setFiles} />
  },
  args: {
    label: 'Загрузить документы',
    required: true,
    multiple: true,
  },
}

export const Default: Story = {
  args: {
    label: 'Документ',
    required: true,
    multiple: true,
  },
}

export const Compact: Story = {
  args: {
    label: 'Вложение',
    size: 'compact',
    multiple: true,
  },
}

export const Single: Story = {
  args: {
    label: 'Аватар профиля',
    multiple: false,
  },
}

export const Localized: Story = {
  name: 'i18n + maxSize',
  args: {
    label: 'Hujjat',
    required: true,
    multiple: true,
    accept: 'image/jpeg,image/png,application/pdf',
    maxSize: 2 * 1024 * 1024,
    texts: {
      title: 'Faylni tanlang yoki shu yerga tashlang',
      subtitle: 'JPEG, PNG, PDF format 2 MB gacha.',
      button: 'Fayl yuklash',
      uploading: 'Yuklanmoqda...',
      done: 'Tayyor',
      error: 'Xatolik',
      download: 'Faylni yuklab olish',
      remove: 'Faylni o‘chirish',
    },
  },
}

const demoFile: UploadFile = {
  id: '1',
  name: 'contract.pdf',
  sizeLabel: '240 KB',
  status: 'done',
  progress: 100,
  ext: 'PDF',
}

const demoUploading: UploadFile = {
  id: '2',
  name: 'scan.png',
  sizeLabel: '1.2 MB',
  status: 'uploading',
  progress: 45,
  ext: 'PNG',
}

const demoError: UploadFile = {
  id: '3',
  name: 'huge.zip',
  sizeLabel: '80 MB',
  status: 'error',
  progress: 0,
  ext: 'ZIP',
}

export const ItemStates: StoryObj<typeof FileUploadItem> = {
  name: '📋 All File Item States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1000 }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>✅ Done</h3>
        <FileUploadItem file={demoFile} onRemove={() => {}} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>⏳ Uploading</h3>
        <FileUploadItem file={demoUploading} onRemove={() => {}} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>❌ Error</h3>
        <FileUploadItem file={demoError} onRemove={() => {}} />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const ItemVariations: StoryObj<typeof FileUploadItem> = {
  name: '📝 Different File Types',
  render: () => {
    const files: UploadFile[] = [
      {
        id: '1',
        name: 'presentation.pptx',
        sizeLabel: '8.5 MB',
        status: 'done',
        progress: 100,
        ext: 'PPTX',
      },
      {
        id: '2',
        name: 'spreadsheet.xlsx',
        sizeLabel: '2.1 MB',
        status: 'done',
        progress: 100,
        ext: 'XLSX',
      },
      {
        id: '3',
        name: 'image.jpg',
        sizeLabel: '4.7 MB',
        status: 'uploading',
        progress: 78,
        ext: 'JPG',
      },
      {
        id: '4',
        name: 'archive.rar',
        sizeLabel: '35 MB',
        status: 'error',
        progress: 0,
        ext: 'RAR',
      },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 1000 }}>
        {files.map((file) => (
          <FileUploadItem key={file.id} file={file} onRemove={() => {}} />
        ))}
      </div>
    )
  },
  parameters: { controls: { disable: true } },
}

export const ItemFromFile: StoryObj = {
  name: 'FileUploadItem (from File)',
  render: () => (
    <FileUploadItem
      file={fileToUploadFile(
        new File(['hello'], 'readme.txt', {
          type: 'text/plain',
        }),
        'done'
      )}
      onRemove={() => {}}
    />
  ),
  parameters: { controls: { disable: true } },
}
