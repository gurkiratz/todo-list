import { atom } from 'recoil'

export const selectedOrgState = atom<string | null>({
  key: 'selectedOrgState', // Unique ID for the atom
  default: null, // Default value (initially no organization is selected)
})
