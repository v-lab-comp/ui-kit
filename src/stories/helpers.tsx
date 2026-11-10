/**
 * Shared mock elements for Storybook stories.
 * Use @remixicon/react — do NOT write raw SVGs here.
 */
import {
  RiUserLine,
  RiSearchLine,
  RiInformationLine,
  RiGlobalLine,
  RiFlashlightLine,
} from '@remixicon/react'

export const PersonIcon = () => <RiUserLine size={16} />
export const SearchIcon = () => <RiSearchLine size={16} />
export const InfoIcon = () => <RiInformationLine size={16} />
export const GlobeIcon = () => <RiGlobalLine size={16} />
export const FlashIcon = () => <RiFlashlightLine size={16} />

export const MockTag = () => (
  <span
    style={{
      fontSize: 11,
      lineHeight: '16px',
      padding: '0 6px',
      borderRadius: 99,
      background: '#E0E7FF',
      color: '#4F46E5',
    }}
  >
    NEW
  </span>
)

export const MockAvatar = () => (
  <img
    src="https://i.pravatar.cc/40"
    alt=""
    style={{ width: 40, height: 40, borderRadius: '50%', display: 'block' }}
  />
)
