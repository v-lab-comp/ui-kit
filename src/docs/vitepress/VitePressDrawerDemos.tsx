import { useRef, type ChangeEvent, type CSSProperties } from 'react'
import { RiSettings3Line, RiUserLine } from '@remixicon/react'
import { Button } from '@/components/Button'
import { EmailInput } from '@/components/inputs/EmailInput'
import { SelectInput } from '@/components/inputs/SelectInput'
import { TextInput } from '@/components/inputs/TextInput'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  type DrawerHandle,
} from '@/components/layout/Drawer'

// ── Стили ─────────────────────────────────────────────────────────────────────

const shell: CSSProperties = {
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: '8px 0',
}

const sectionTitle: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--text-sub-600, #64748b)',
}

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
}

/** Визуально как фрагмент панели Drawer — для статичных превью Header/Footer */
function PanelSlice({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--stroke-soft-200)',
        borderRadius: 'var(--radius-12)',
        background: 'var(--bg-white-0)',
        overflow: 'hidden',
        maxWidth: 480,
      }}
    >
      {children}
    </div>
  )
}

function IconSlot({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-soft-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  )
}

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'viewer', label: 'Просмотр' },
]

const DEPARTMENT_OPTIONS = [
  { value: 'dev', label: 'Разработка' },
  { value: 'design', label: 'Дизайн' },
  { value: 'hr', label: 'HR' },
]

// ── Полное превью ──────────────────────────────────────────────────────────────

export function DrawerDocsDemo() {
  const inviteRef = useRef<DrawerHandle>(null)
  const editRef = useRef<DrawerHandle>(null)

  return (
    <div style={shell}>
      <section>
        <h3 style={sectionTitle}>Форма создания — ref</h3>
        <div style={row}>
          <Button onClick={() => inviteRef.current?.open()}>Пригласить пользователя</Button>
        </div>
        <Drawer ref={inviteRef} size="md">
          <DrawerHeader title="Новый пользователь" subtitle="Заполните данные и выберите роль" />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput label="Полное имя" required placeholder="Иван Иванов" />
              <EmailInput label="Email" required placeholder="user@company.com" />
              <SelectInput
                label="Роль"
                placeholder="Выберите роль"
                options={ROLE_OPTIONS}
                value=""
                onChange={(_e: ChangeEvent<HTMLSelectElement>) => {}}
              />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="stroke"
              color="neutral"
              size="small"
              onClick={() => inviteRef.current?.close()}
            >
              Отмена
            </Button>
            <Button size="small" onClick={() => inviteRef.current?.close()}>
              Пригласить
            </Button>
          </DrawerFooter>
        </Drawer>
      </section>

      <section>
        <h3 style={sectionTitle}>Редактирование — side="right"</h3>
        <div style={row}>
          <Button variant="stroke" color="neutral" onClick={() => editRef.current?.open()}>
            Редактировать сотрудника
          </Button>
        </div>
        <Drawer ref={editRef} side="right" size="md">
          <DrawerHeader
            title="Ахмад Каримов"
            subtitle="ID: EMP-00142"
            icon={<IconSlot icon={<RiUserLine size={20} color="var(--icon-sub-600)" />} />}
          />
          <DrawerBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextInput label="Полное имя" required defaultValue="Ахмад Каримов" />
              <SelectInput
                label="Отдел"
                options={DEPARTMENT_OPTIONS}
                value="dev"
                onChange={(_e: ChangeEvent<HTMLSelectElement>) => {}}
              />
            </div>
          </DrawerBody>
          <DrawerFooter
            startContent={
              <span style={{ fontSize: 13, color: 'var(--text-sub-600)' }}>
                Изменено: 12 мая 2026
              </span>
            }
          >
            <Button
              variant="stroke"
              color="neutral"
              size="small"
              onClick={() => editRef.current?.close()}
            >
              Отмена
            </Button>
            <Button size="small" onClick={() => editRef.current?.close()}>
              Сохранить
            </Button>
          </DrawerFooter>
        </Drawer>
      </section>
    </div>
  )
}

// ── DrawerHeader секция ────────────────────────────────────────────────────────

export function DrawerHeaderDocsDemo() {
  const plainRef = useRef<DrawerHandle>(null)
  const iconRef = useRef<DrawerHandle>(null)
  const closeOnlyRef = useRef<DrawerHandle>(null)

  return (
    <div style={shell}>
      <section>
        <h3 style={sectionTitle}>Заголовок и подзаголовок</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          <PanelSlice>
            <DrawerHeader title="Заголовок" />
          </PanelSlice>
          <PanelSlice>
            <DrawerHeader title="Заголовок" subtitle="Подзаголовок поясняет контекст панели" />
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>С иконкой слева (слот 40×40)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          <PanelSlice>
            <DrawerHeader
              title="Настройки проекта"
              subtitle="Измените параметры объекта"
              icon={<IconSlot icon={<RiSettings3Line size={20} color="var(--icon-sub-600)" />} />}
            />
          </PanelSlice>
          <PanelSlice>
            <DrawerHeader
              title="Профиль сотрудника"
              subtitle="ID: EMP-00142"
              icon={<IconSlot icon={<RiUserLine size={20} color="var(--icon-sub-600)" />} />}
            />
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>hideCloseButton — без крестика</h3>
        <div style={{ maxWidth: 480 }}>
          <PanelSlice>
            <DrawerHeader
              title="Информационная панель"
              subtitle="Закрывается только программно"
              hideCloseButton
            />
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>closeOnly — только кнопка закрытия</h3>
        <div style={{ maxWidth: 480 }}>
          <PanelSlice>
            <DrawerHeader closeOnly />
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>Открыть с примерами</h3>
        <div style={row}>
          <Button
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => plainRef.current?.open()}
          >
            Заголовок + подзаголовок
          </Button>
          <Button
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => iconRef.current?.open()}
          >
            С иконкой
          </Button>
          <Button
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => closeOnlyRef.current?.open()}
          >
            closeOnly
          </Button>
        </div>

        <Drawer ref={plainRef} size="md">
          <DrawerHeader title="Заголовок" subtitle="Подзаголовок поясняет суть панели." />
          <DrawerBody>
            <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>Контент тела.</p>
          </DrawerBody>
        </Drawer>

        <Drawer ref={iconRef} size="md">
          <DrawerHeader
            title="Настройки"
            subtitle="Измените параметры"
            icon={<IconSlot icon={<RiSettings3Line size={20} color="var(--icon-sub-600)" />} />}
          />
          <DrawerBody>
            <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>Контент тела.</p>
          </DrawerBody>
        </Drawer>

        <Drawer ref={closeOnlyRef} size="md">
          <DrawerHeader closeOnly />
          <DrawerBody>
            <p style={{ margin: 0, fontWeight: 600 }}>Заголовок в теле</p>
            <p style={{ margin: '8px 0 0', color: 'var(--text-sub-600)' }}>
              При closeOnly заголовок задаётся в DrawerBody.
            </p>
          </DrawerBody>
        </Drawer>
      </section>
    </div>
  )
}

// ── DrawerFooter секция ────────────────────────────────────────────────────────

export function DrawerFooterDocsDemo() {
  return (
    <div style={shell}>
      <section>
        <h3 style={sectionTitle}>Только кнопки (children)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          <PanelSlice>
            <DrawerFooter>
              <Button variant="stroke" color="neutral" size="small">
                Отмена
              </Button>
              <Button size="small">Сохранить</Button>
            </DrawerFooter>
          </PanelSlice>
          <PanelSlice>
            <DrawerFooter>
              <Button size="small">Закрыть</Button>
            </DrawerFooter>
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>startContent — слот слева</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          <PanelSlice>
            <DrawerFooter
              startContent={
                <span style={{ fontSize: 13, color: 'var(--text-sub-600)' }}>
                  Изменено: 12 мая 2026
                </span>
              }
            >
              <Button variant="stroke" color="neutral" size="small">
                Отмена
              </Button>
              <Button size="small">Сохранить</Button>
            </DrawerFooter>
          </PanelSlice>
          <PanelSlice>
            <DrawerFooter
              startContent={
                <Button variant="ghost" color="error" size="small">
                  Удалить
                </Button>
              }
            >
              <Button variant="stroke" color="neutral" size="small">
                Отмена
              </Button>
              <Button size="small">Сохранить</Button>
            </DrawerFooter>
          </PanelSlice>
          <PanelSlice>
            <DrawerFooter
              startContent={
                <span style={{ fontSize: 13, color: 'var(--text-sub-600)' }}>
                  3 из 12 записей выбрано
                </span>
              }
            >
              <Button variant="stroke" color="neutral" size="small">
                Сбросить
              </Button>
              <Button size="small">Применить</Button>
            </DrawerFooter>
          </PanelSlice>
        </div>
      </section>

      <section>
        <h3 style={sectionTitle}>fullWidth — кнопки на всю ширину</h3>
        <div style={{ maxWidth: 480 }}>
          <PanelSlice>
            <DrawerFooter fullWidth>
              <Button variant="stroke" color="neutral" size="small">
                Отмена
              </Button>
              <Button size="small">Сохранить</Button>
            </DrawerFooter>
          </PanelSlice>
        </div>
      </section>
    </div>
  )
}

// ── Размеры и стороны ──────────────────────────────────────────────────────────

export function DrawerSizesDocsDemo() {
  const smRef = useRef<DrawerHandle>(null)
  const mdRef = useRef<DrawerHandle>(null)
  const lgRef = useRef<DrawerHandle>(null)
  const xlRef = useRef<DrawerHandle>(null)
  const rightRef = useRef<DrawerHandle>(null)
  const bottomRef = useRef<DrawerHandle>(null)

  return (
    <div style={shell}>
      <section>
        <h3 style={sectionTitle}>Пресеты ширины (side="left")</h3>
        <div style={row}>
          {(
            [
              { ref: smRef, size: 'sm', label: 'sm — 360px' },
              { ref: mdRef, size: 'md', label: 'md — 440px' },
              { ref: lgRef, size: 'lg', label: 'lg — 560px' },
              { ref: xlRef, size: 'xl', label: 'xl — 720px' },
            ] as const
          ).map(({ ref, size, label }) => (
            <Button
              key={size}
              size="small"
              variant="stroke"
              color="neutral"
              onClick={() => ref.current?.open()}
            >
              {label}
            </Button>
          ))}
        </div>

        <Drawer ref={smRef} size="sm">
          <DrawerHeader title='size="sm"' subtitle="Ширина 360px" />
          <DrawerBody>
            <TextInput label="Поле" placeholder="Пример" />
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => smRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
        <Drawer ref={mdRef} size="md">
          <DrawerHeader title='size="md"' subtitle="Ширина 440px (по умолчанию)" />
          <DrawerBody>
            <TextInput label="Поле" placeholder="Пример" />
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => mdRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
        <Drawer ref={lgRef} size="lg">
          <DrawerHeader title='size="lg"' subtitle="Ширина 560px" />
          <DrawerBody>
            <TextInput label="Поле" placeholder="Пример" />
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => lgRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
        <Drawer ref={xlRef} size="xl">
          <DrawerHeader title='size="xl"' subtitle="Ширина 720px" />
          <DrawerBody>
            <TextInput label="Поле" placeholder="Пример" />
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => xlRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
      </section>

      <section>
        <h3 style={sectionTitle}>Стороны</h3>
        <div style={row}>
          <Button
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => rightRef.current?.open()}
          >
            side="right"
          </Button>
          <Button
            size="small"
            variant="stroke"
            color="neutral"
            onClick={() => bottomRef.current?.open()}
          >
            side="bottom"
          </Button>
        </div>

        <Drawer ref={rightRef} side="right" size="md">
          <DrawerHeader title='side="right"' subtitle="Выезжает справа" />
          <DrawerBody>
            <TextInput label="Поле" placeholder="Пример" />
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => rightRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
        <Drawer ref={bottomRef} side="bottom" size="sm">
          <DrawerHeader title='side="bottom"' subtitle="Выезжает снизу" />
          <DrawerBody>
            <p style={{ margin: 0, color: 'var(--text-sub-600)' }}>Контент.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button size="small" onClick={() => bottomRef.current?.close()}>
              Закрыть
            </Button>
          </DrawerFooter>
        </Drawer>
      </section>
    </div>
  )
}
