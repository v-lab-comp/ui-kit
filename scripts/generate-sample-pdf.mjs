#!/usr/bin/env node
/**
 * Генерирует public/sample.pdf — одна страница A4 с видимым текстом (для Storybook / PdfPreview).
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '../public/sample.pdf')

const stream = 'BT\n/F1 36 Tf\n72 720 Td\n(V-Lab sample PDF) Tj\nET\n'
const streamLen = Buffer.byteLength(stream, 'latin1')

const body =
  '%PDF-1.4\n' +
  '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
  '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
  '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n' +
  `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}endstream\nendobj\n` +
  '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'

const xrefPos = Buffer.byteLength(body, 'binary')
const xref =
  'xref\n' +
  '0 6\n' +
  '0000000000 65535 f \n' +
  `${String(offsetOf(body, '1 0 obj')).padStart(10, '0')} 00000 n \n` +
  `${String(offsetOf(body, '2 0 obj')).padStart(10, '0')} 00000 n \n` +
  `${String(offsetOf(body, '3 0 obj')).padStart(10, '0')} 00000 n \n` +
  `${String(offsetOf(body, '4 0 obj')).padStart(10, '0')} 00000 n \n` +
  `${String(offsetOf(body, '5 0 obj')).padStart(10, '0')} 00000 n \n` +
  'trailer\n' +
  '<< /Size 6 /Root 1 0 R >>\n' +
  'startxref\n' +
  `${xrefPos}\n` +
  '%%EOF\n'

function offsetOf(haystack, needle) {
  const i = Buffer.from(haystack, 'binary').indexOf(Buffer.from(needle, 'binary'))
  if (i < 0) throw new Error(`missing ${needle}`)
  return i
}

const pdf = body + xref
writeFileSync(out, pdf, 'binary')
console.log('Wrote', out, Buffer.byteLength(pdf, 'binary'), 'bytes')
