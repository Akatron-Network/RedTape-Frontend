export default function CurrencyFormat(num) {
  if (!num) return undefined
  let f_num = parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',')
  
  return f_num
}