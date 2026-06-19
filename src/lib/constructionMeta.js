import { ConcreteIcon, MasonryIcon, SteelIcon } from '../components/icons/ConstructionIcons.jsx'

export const CONSTRUCTION_META = {
  'concrete-block': { label: 'Concrete block construction', Icon: ConcreteIcon },
  masonry: { label: 'Masonry construction', Icon: MasonryIcon },
  'steel-frame': { label: 'Steel frame construction', Icon: SteelIcon },
}

export function getConstructionMeta(type) {
  return CONSTRUCTION_META[type] ?? { label: 'Durable construction', Icon: ConcreteIcon }
}
