export default function CurrencyFormat(num) {
  if (!num) return undefined
  return parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',')
}