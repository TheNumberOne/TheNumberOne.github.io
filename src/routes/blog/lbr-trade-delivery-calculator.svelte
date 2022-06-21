<script context='module' lang='ts'>
  export const metadata = {
    title: 'LBR - Trade Delivery Calculator',
    date: '2022-06-20',
    description: 'A trade delivery calculator for Leaf Blower Revolution'
  }
</script>

<script lang='ts'>
  import { calculateBonus, type Configuration } from '../../lib/lbr/tradeDeliveryCalculator'
  import Blog from '$layouts/blog.svelte'
  import { percentFormat } from '../../lib/const/percentFormat'

  let configuration: Configuration = {
    options: {
      tradersCrunchChallenge: false,
      petScroll: false,
      uniqueScroll: false,
      betterPets: false,
      betterUniques: false
    },
    equipped: {
      butterflyo: {
        active: true,
        upgrades: 10
      },
      penguino: {
        active: true,
        upgrades: 10
      },
      waterLeaf: {
        active: true,
        upgrades: 10
      },
      uniqueLeaf: {
        active: true,
        upgrades: 10
      },
      petLeaf: {
        active: false,
        upgrades: 10
      }
    }
  }

  function camelCaseToCapitalizedWords(camelCase: string): string {
    return camelCase.split(/(?=\p{Lu})/gu).map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
  }

  $: tradeBonus = calculateBonus(configuration)
  $: tradeMinutes = Math.max(2, 120 * (1 - tradeBonus.total))
  $: tradeTotalSeconds = Math.round(tradeMinutes * 60)
  $: tradeWholeMinutes = Math.floor(tradeTotalSeconds / 60)
  $: tradeRemainderSeconds = tradeTotalSeconds % 60
</script>

<Blog {...metadata}>
  <fieldset>
    <legend>
      Upgrades purchased or active:
    </legend>
    {#each Object.entries(configuration.options) as [option, enabled] }
      <input id={option} type='checkbox' checked={enabled}
             on:change={(e) => configuration.options[option] = e.target.checked} />
      <label for={option}>
        {camelCaseToCapitalizedWords(option)}
      </label>
      <br />
    {/each}
  </fieldset>
  <fieldset class='my-4'>
    <legend>
      Active pets and leaves:
    </legend>
    {#each Object.entries(configuration.equipped) as [equipment, { active, upgrades }] }
      <div class='my-1'>
        <input id={equipment} type='checkbox' checked={active}
               on:change={(e) => configuration.equipped[equipment].active = e.target.checked} />
        <label for={equipment}>
          {camelCaseToCapitalizedWords(equipment)}
        </label>
        <input
          class='w-16 ml-4 border-gray-400 border p-1'
          id={`${equipment}-upgrades`}
          type='number'
          min='0' max='150'
          value={upgrades}
          on:change={(e) => configuration.equipped[equipment].upgrades = e.target.value}
        />
      </div>
    {/each}
  </fieldset>

  <p>
    Total bonus: {percentFormat.format(tradeBonus.total)}
    <br/>
    Trade delivery time: {tradeWholeMinutes} minutes {tradeRemainderSeconds} seconds
  </p>

  <p>
    Total contributions:
  </p>
  <ul>
    {#each Object.keys(configuration.options) as option }
      <li>
        {camelCaseToCapitalizedWords(option)}:
        {percentFormat.format(tradeBonus.contribution.options[option])}
      </li>
    {/each}
    {#each Object.keys(configuration.equipped) as equip }
      <li>
        {camelCaseToCapitalizedWords(equip)}:
        {percentFormat.format(tradeBonus.contribution.equipped[equip].toString())}
        ({percentFormat.format(tradeBonus.upgradeContribution[equip])} per upgrade)
      </li>
    {/each}
  </ul>
</Blog>