import { deepSet } from '../util/deepSet'
import { addRecords } from '../util/addRecords'
import { multiplyRecords } from '../util/multiplyRecords'
import { clamp } from '../util/clamp'

type Equipped = 'butterflyo' | 'penguino' | 'waterLeaf' | 'uniqueLeaf' | 'petLeaf'
type Option =
  | 'tradersCrunchChallenge'
  | 'petScroll'
  | 'uniqueScroll'
  | 'betterPets'
  | 'betterUniques'

interface Data {
  options: Record<Option, { bonus: number }>
  equipped: Record<
    Equipped,
    { bonus: number; equippedDependencies: Equipped[]; optionDependencies: Option[] }
  >
}

const DATA: Data = {
  options: {
    tradersCrunchChallenge: {
      bonus: 0.15
    },
    petScroll: {
      bonus: 0.2
    },
    uniqueScroll: {
      bonus: 0.2
    },
    betterPets: {
      bonus: 0.3
    },
    betterUniques: {
      bonus: 0.3
    }
  },
  equipped: {
    butterflyo: {
      bonus: 0.2,
      equippedDependencies: [],
      optionDependencies: []
    },
    penguino: {
      bonus: 0.25,
      equippedDependencies: ['petLeaf', 'butterflyo'],
      optionDependencies: ['betterPets', 'petScroll']
    },
    waterLeaf: {
      bonus: 0.1,
      equippedDependencies: ['uniqueLeaf', 'butterflyo'],
      optionDependencies: ['betterUniques', 'uniqueScroll']
    },
    uniqueLeaf: {
      bonus: 0.25,
      equippedDependencies: ['butterflyo'],
      optionDependencies: []
    },
    petLeaf: {
      bonus: 0.2,
      equippedDependencies: ['butterflyo', 'uniqueLeaf'],
      optionDependencies: []
    }
  }
}

export interface Configuration {
  options: Record<Option, boolean>
  equipped: Record<Equipped, { active: boolean; upgrades: number }>
}

interface Bonus {
  total: number
  contribution: {
    options: Record<Option, number>
    equipped: Record<Equipped, number>
  }
  upgradeContribution: Record<Equipped, number>
}

const EMPTY_BONUS: Bonus = {
  total: 0,
  contribution: {
    options: {
      tradersCrunchChallenge: 0,
      petScroll: 0,
      uniqueScroll: 0,
      betterPets: 0,
      betterUniques: 0
    },
    equipped: {
      butterflyo: 0,
      penguino: 0,
      waterLeaf: 0,
      uniqueLeaf: 0,
      petLeaf: 0
    }
  },
  upgradeContribution: {
    butterflyo: 0,
    penguino: 0,
    waterLeaf: 0,
    uniqueLeaf: 0,
    petLeaf: 0
  }
}

function optionBonus(config: Configuration, option: Option): Bonus {
  const value = config.options[option] ? DATA.options[option].bonus : 0

  return deepSet(
    deepSet(EMPTY_BONUS, ['contribution', 'options', option] as const, value),
    ['total'] as const,
    value
  )
}

export function calculateBonus(config: Configuration): Bonus {
  const equippedBonuses: Partial<Record<Equipped, Bonus>> = {}

  function equippedBonus(equip: Equipped): Bonus {
    const bonus = equippedBonuses[equip]
    if (bonus != null) {
      return bonus
    }

    if (!config.equipped[equip].active) {
      equippedBonuses[equip] = EMPTY_BONUS
      return EMPTY_BONUS
    }

    let dependenciesBoost = EMPTY_BONUS

    for (const equipDependent of DATA.equipped[equip].equippedDependencies) {
      dependenciesBoost = addRecords(dependenciesBoost, equippedBonus(equipDependent))
    }

    for (const optionDependent of DATA.equipped[equip].optionDependencies) {
      dependenciesBoost = addRecords(dependenciesBoost, optionBonus(config, optionDependent))
    }

    const upgrade = deepSet(EMPTY_BONUS, ['upgradeContribution', equip] as const, 0.1)
    const baseValue = 1 + 0.1 * clamp(config.equipped[equip].upgrades, 0, 10)
    const contribution = deepSet(
      deepSet(EMPTY_BONUS, ['contribution', 'equipped', equip] as const, baseValue),
      ['total'] as const,
      baseValue
    )

    const result = multiplyRecords(
      DATA.equipped[equip].bonus,
      addRecords(contribution, upgrade, dependenciesBoost)
    )

    equippedBonuses[equip] = result
    return result
  }

  return addRecords(
    equippedBonus('waterLeaf'),
    equippedBonus('penguino'),
    optionBonus(config, 'tradersCrunchChallenge')
  )
}
