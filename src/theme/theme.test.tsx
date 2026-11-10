import { act, render, renderHook, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/Button'
import { contractAttrs, contractSelector, defineContract } from './contract'
import { buttonContract } from './contracts'
import { defineSkin, themeHtmlAttributes } from './skin'
import { ThemeProvider, useTheme } from './ThemeProvider'

const html = document.documentElement
const base = defineSkin({ name: 'base', schemes: ['light', 'dark'] })
const brand = defineSkin({ name: 'brand', schemes: ['light', 'dark'], extends: base })

afterEach(() => {
  localStorage.clear()
  vi.unstubAllGlobals()
})

describe('contract', () => {
  const demo = defineContract({
    name: 'demo',
    attributes: { size: ['s', 'm'] },
    states: ['busy'],
    parts: ['icon'],
  })

  it('builds class name, data attributes and selector', () => {
    expect(demo.className).toBe('vl-demo')
    expect(contractAttrs(demo, { size: 'm', busy: true })).toEqual({
      'data-size': 'm',
      'data-busy': '',
    })
    expect(contractAttrs(demo, { busy: false })).toEqual({})
    expect(contractSelector(demo, { size: 's', busy: true })).toBe(
      ".vl-demo[data-size='s'][data-busy]"
    )
  })
})

describe('Button contract', () => {
  it('renders stable class and data attributes', () => {
    render(
      <Button variant="stroke" size="small" shape="circle" color="error">
        Btn
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass(buttonContract.className)
    expect(btn).toHaveAttribute('data-variant', 'stroke')
    expect(btn).toHaveAttribute('data-size', 'small')
    expect(btn).toHaveAttribute('data-shape', 'circle')
    expect(btn).toHaveAttribute('data-color', 'error')
    expect(btn).not.toHaveAttribute('data-custom-color')
  })

  it('marks customColor with a state instead of data-color', () => {
    render(<Button customColor="#7c3aed">Btn</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('data-custom-color', '')
    expect(btn).not.toHaveAttribute('data-color')
  })
})

describe('ThemeProvider', () => {
  const wrapper =
    (props: Partial<Parameters<typeof ThemeProvider>[0]> = {}) =>
    ({ children }: { children: ReactNode }) => (
      <ThemeProvider skins={[base, brand]} {...props}>
        {children}
      </ThemeProvider>
    )

  it('puts skin chain and scheme on <html> and cleans up on unmount', () => {
    const { unmount } = render(
      <ThemeProvider skins={[base, brand]} defaultSkin="brand" defaultColorScheme="dark" />
    )
    expect(html.getAttribute('data-vl-skin')).toBe('base brand')
    expect(html.getAttribute('data-vl-scheme')).toBe('dark')
    expect(html.getAttribute('data-theme')).toBe('dark')
    expect(html.style.colorScheme).toBe('dark')
    unmount()
    expect(html.hasAttribute('data-vl-skin')).toBe(false)
    expect(html.hasAttribute('data-theme')).toBe(false)
  })

  it('themeHtmlAttributes (SSR) gives the same attributes the provider sets', () => {
    const attrs = themeHtmlAttributes(brand, 'dark')
    expect(attrs).toEqual({
      'data-vl-skin': 'base brand',
      'data-vl-scheme': 'dark',
      'data-theme': 'dark',
      style: { colorScheme: 'dark' },
    })
    const { unmount } = render(
      <ThemeProvider skins={[base, brand]} defaultSkin="brand" defaultColorScheme="dark" />
    )
    for (const name of ['data-vl-skin', 'data-vl-scheme', 'data-theme'] as const)
      expect(html.getAttribute(name)).toBe(attrs[name])
    expect(html.style.colorScheme).toBe(attrs.style.colorScheme)
    unmount()
  })

  it('keeps the skin while another provider is still mounted', () => {
    const first = render(<ThemeProvider skins={[base]} defaultColorScheme="dark" />)
    const second = render(<ThemeProvider skins={[base, brand]} defaultSkin="brand" />)
    first.unmount()
    expect(html.getAttribute('data-vl-skin')).toBe('base brand')
    expect(html.getAttribute('data-vl-scheme')).toBe('light')
    second.unmount()
    expect(html.hasAttribute('data-vl-skin')).toBe(false)
    expect(html.hasAttribute('data-vl-scheme')).toBe(false)
  })

  it('switches skin and scheme through useTheme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper() })
    expect(result.current.skin).toBe('base')
    expect(result.current.resolvedColorScheme).toBe('light')
    act(() => result.current.setSkin('brand'))
    act(() => result.current.setColorScheme('dark'))
    expect(html.getAttribute('data-vl-skin')).toBe('base brand')
    expect(html.getAttribute('data-vl-scheme')).toBe('dark')
    expect(() => result.current.setSkin('missing')).toThrow(/missing/)
  })

  it('resolves system scheme via matchMedia', () => {
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper({ defaultColorScheme: 'system' }),
    })
    expect(result.current.colorScheme).toBe('system')
    expect(result.current.resolvedColorScheme).toBe('dark')
  })

  it('remembers the choice with storageKey', () => {
    const first = renderHook(() => useTheme(), { wrapper: wrapper({ storageKey: 'vl-test' }) })
    act(() => first.result.current.setColorScheme('dark'))
    first.unmount()
    const second = renderHook(() => useTheme(), { wrapper: wrapper({ storageKey: 'vl-test' }) })
    expect(second.result.current.colorScheme).toBe('dark')
  })

  it('in controlled mode only reports changes', () => {
    const onColorSchemeChange = vi.fn()
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper({ colorScheme: 'light', onColorSchemeChange }),
    })
    act(() => result.current.setColorScheme('dark'))
    expect(onColorSchemeChange).toHaveBeenCalledWith('dark')
    expect(result.current.colorScheme).toBe('light')
  })

  it('applies a lazily loaded skin only after its CSS loads', async () => {
    let resolveLoad: () => void = () => {}
    const lazy = defineSkin({
      name: 'lazy',
      schemes: ['light', 'dark'],
      load: () => new Promise<void>((r) => (resolveLoad = r)),
    })
    render(<ThemeProvider skins={[lazy]} />)
    expect(html.hasAttribute('data-vl-skin')).toBe(false)
    await act(async () => resolveLoad())
    expect(html.getAttribute('data-vl-skin')).toBe('lazy')
  })

  it('useTheme outside the provider throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/)
  })
})
