export default function currencyFormat(num) {
  if (!num) return undefined
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',')
}