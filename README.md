# How To Run

1. Install all package depedence, type it in terminal vsc `npm i`
2. copy file .env.example lalu ubah file copy nya menjadi .env, pada file .env isi value `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` sesuai dengan database
3. create folder uploads on root path
4. Run server with type `npm run start`
5. it will running on `http://127.0.0.1:3001`

# List of feature

- Terdapat 2 Role: admin dan donatur

### Feature Role admin

1. Dashboard

   1. admin can view data

      - total anak yatim &#9745;
      - total anak piatu &#9745;
      - total anak yatim piatu &#9745;
      - total anak dhuafa &#9745;
      - total donatur yang telah berpartisipasi &#9745;
      - total donasi yang telah terverifikasi &#9745;
      - Jumlah donasi yang belum terverifikasi &#9745;

   1. ## admin can view activity

      -

1. Data Anak Asuh
   1. admin bisa view list data anak asuh & wali &#9745;
   1. admin bisa menambahkan data anak asuh & wali &#9745;
   1. admin bisa update data anak asuh <s>& wali</s>
   1. admin bisa delete data anak asuh <s>& wali</s>
1. Donasi
   - Donasi
     1. admin bisa menambahkan data donasi &#9745;
     1. admin bisa melihat detail upload photo donatur &#9745;
     1. admin bisa memverifikasi donasi [PENDING | REJECT | APPROVED] &#9745;
     1. admin bisa update donasi &#9745;
   - Donatur
     1. admin bisa melihat list account donatur
     1. admin bisa mengapprove account request donatur
1. Campaign donasi
   1. admin bisa menambahkan campaign donasi &#9745;
   1. admin bisa view list campaign donasi &#9745;
   1. admin bisa view detail campaign donasi &#9745;
   1. admin bisa update campaign donasi
   1. <s>admin bisa delete campaign donasi</s>
1. Report
   1. report
1. Galeri
   1. admin bisa membuat galeri dari sebuah kegiatan

### Feature Role Donatur

#### Update dari ferdi

1. kata kata place holder dirubah sama eug &#9745;
2. #Dashboard
   - Buat Card Total anak asuh, Jumlah Donatur yang berpartisipasi,
     Jumlah donasi yang terverfikasi (Per Campaign) klo bisa ada dropdown klik buat bisa ganti" jumlah donasi percampaignnya,
     Jumlah Donasi yang belum diverifikasi,
     aktivitas donatur, sama aktivitas list donasi yang perlu diverifikasi (Seperti Jurnal).
3. Jadiin button register donatur
4. Button Cetak(pdf),Update,Delete belum fungsi
5. Field hubungan,tanggal wafat, sama data wali dihapus aja
6. Alert klo gagal login,daftar,create,update,delete.
