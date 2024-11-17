function TimeZoneIndonesia() {
   const date = new Date()
   const timeZone = 'Asia/Bangkok';
   if (typeof date === 'string') {
      return new Date(
         new Date(date).toLocaleString('en-US', {
            timeZone,
         }),
      );
   }

   return new Date(
      date.toLocaleString('en-US', {
         timeZone,
      }),
   );
}

function GetDate() {
   var dt = TimeZoneIndonesia()
   var mth = dt.getMonth() + 1
   var rs = dt.getFullYear() + "-" + mth + "-" + dt.getDate()
   console.log('LOG-RES', rs)
   return rs
}
function GetTime() {
   var dt = TimeZoneIndonesia()
   var rs = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
   console.log('LOG-RES', rs)
   return rs
}
module.exports = {
   TimeZoneIndonesia,
   GetDate,
   GetTime,
};