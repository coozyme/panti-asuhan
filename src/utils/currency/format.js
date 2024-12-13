function formatRupiah(number) {
   return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
   }).replace('Rp', 'Rp.');;
}

function getNominal(rupiahString) {
   // Remove 'Rp', commas, and trim whitespace
   const cleanedString = rupiahString.replace(/[Rp\s,]/g, '');

   // Convert to number
   return parseInt(cleanedString, 10);
}
module.exports = {
   formatRupiah,
   getNominal
}