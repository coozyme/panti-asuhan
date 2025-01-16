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
   1. admin bisa update data anak asuh <s>& wali</s> &#9745;
   1. admin bisa delete data anak asuh <s>& wali</s> &#9745;
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
   1. admin bisa update campaign donasi &#9745;
   1. <s>admin bisa delete campaign donasi</s>
1. Report
   1. report
1. Galeri
   1. admin bisa membuat galeri dari sebuah kegiatan

### Feature Role Donatur

#### Update dari ferdi

1. kata kata place holder dirubah sama eug &#9745;

2. # Landing Page

   - Buat Button Login dan Daftar Donatur samping"an &#9745;
   - yang diform login klik daftarnya ilangin ae &#9745;
   - isi foto landing page yang perlu perlu ae source : <https://drive.google.com/drive/folders/1HNXejV66aeskkzWRFWVp3ge-F-mYqkfL?usp=sharing> &#9745;
   - pop up Alert Login ,registrasi &#9745;
   - Button logout &#9745;

   # Dashboard

   - Buat Card Total anak asuh, Jumlah Donatur yang berpartisipasi, &#9745;
   - Jumlah donasi yang terverfikasi (Per Campaign) klo bisa ada dropdown klik buat bisa ganti" jumlah donasi percampaignnya,
   - Jumlah Donasi yang belum diverifikasi &#9745;,
   - aktivitas donatur, sama aktivitas list donasi yang perlu diverifikasi (Seperti Jurnal).

   # Data Anak Asuh = Anak Asuh

   - urut asc a-z by nama
   - tambahin atribut 'Kelas'
   - textbox photo blm bisa input gambar &#9745;
   - Field hubungan,tanggal wafat, sama data wali dihapus aja &#9745;
   - field status blm lengkap kategori yatim,piatu,yatim piatu,dhuafa &#9745;
   - set semua atribut harus diisi kecuali no hp dan keterangan &#9745;
   - databasenya juga di drop yang wali &#9745;
   - action CRUD + Filter search

   # Donasi = Donasi Masuk

   - urut by tanggal terupdate donasi yang masuk
   - button simpan, validasi , update adain popup alertnya
   - di update donasi di box tanggalnya ga muncul pilihan tanggal kalendernya ya ? gw klik ikon kalendernya ga pop up tanggal kalender gitu ? &#9745;
   - di tambah gausah dimunculin aja textboxnya (tanggal verifikasi) klo udh di set tanggal hari sekarangnya, di update juga
   - action CRUD + Filter search
   - nama campaign yang dituju

   # Donatur = BELUM WORK

   # Campaign = dibuat di nav nya 1 aja kaya nav data anak asuh, kalau emg ga ada isi selain buat nambahin campaign doang

   - field (tanggal mulai campaign set jadi hari sekarang aja) + gausah di tampilin di form
   - yang radio set sebagai primarynya ganti jadi apa ya enaknya kata"nya ? kbarin
   - alert CRUD

   # Laporan

   - Jumlah Total donasi per campaign dan yang dikelola untuk yayasan
   - pengeluaran fieldnya (nama campaign, keterangan pengeluaran, jumlah, tanggal, foto(tidak wajib diisi)) nanti itu relasi sama jumlah total donasi per campign dan yayasan.
   - CRUD + PRINT

   # Galeri = Belum Work

3. Filter search,Update,Delete belum fungsi
4. Simbol sama button" dicek redirect kemana kemananya
5. Alert klo gagal login,daftar,create,update,delete.
6. TUNGGU UPDATE SELANJUTNYA
   123123
