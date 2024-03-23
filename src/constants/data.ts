import { MATERIALS, SORT_DIR } from './enums'

export const DISCOUNT_TEXT = 'Скидка'

export const USER_SELECTION_KEY = 'user-selections'

export const ITEMS_PATH = '/items.json'

export const MATERIALS_PATH = '/materials.json'

export const SORT_OPTIONS = [
    {
        label: 'Цена по возрастанию',
        value: SORT_DIR.ASC,
    },
    {
        label: 'Цена по убыванию',
        value: SORT_DIR.DESC,
    },
]

export const DISPLAY_OPTIONS = [
    {
        label: 'Металл',
        value: MATERIALS.METAL,
    },
    {
        label: 'Дерево',
        value: MATERIALS.WOOD,
    },
    {
        label: 'Все материалы',
        value: MATERIALS.ALL,
    },
]
