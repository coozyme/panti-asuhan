CREATE TABLE `admin` (
  `id`int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255)  NOT NULL,
  `username` varchar(128)  NOT NULL,
  `number_phone` varchar(128)  NOT NULL,
  `email` varchar(128)  NOT NULL,
  `password` varchar(255)  NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

CREATE TABLE `donatur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `address` text,
  `number_phone` varchar(128),
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('PENDING', 'VERIFIED', 'REJECT') DEFAULT 'PENDING',
  PRIMARY KEY (`id`)
);

CREATE TABLE `wali` (
  `id`int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `address` text,
  `number_phone` varchar(128),
  `umur` varchar(128),
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- db_panti_asuhan.anak_asuh definition

CREATE TABLE `anak_asuh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `kelamin` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `tempat_lahir` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number_phone` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `ayah` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ibu` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_wafat` date DEFAULT NULL,
  `keterangan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_wali` int NOT NULL,
  `id_admin` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_admin` (`id_admin`),
  KEY `id_wali` (`id_wali`),
  CONSTRAINT `anak_asuh_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `anak_asuh_ibfk_2` FOREIGN KEY (`id_wali`) REFERENCES `wali` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `campaign_donasi` (
  `id`int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text,
  `target_donasi` double(11,0) NOT NULL DEFAULT '0',
  `terkumpul` double(11,0) NOT NULL DEFAULT '0',
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `status` enum('PUBLISH', 'UNPUBLISH') DEFAULT 'PUBLISH',
  `main_campaign` bool DEFAULT false,
  `id_admin` int NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id`)
);

CREATE TABLE `kegiatan` (
  `id`int NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) NULL,
  `kegiatan` varchar(128) NOT NULL,
  `keterangan` varchar(128),
  `tanggal` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `tanggal_upload` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `id_admin` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id`)
);

CREATE TABLE `galeries` (
  `id`int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) ,
  `id_kegiatan` int ,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan`(`id`)
);


CREATE TABLE `donasi` (
  `id`int NOT NULL AUTO_INCREMENT,
  `id_campaign_donasi` int NOT NULL,
  `metode` enum('TRANSFER', 'TUNAI') DEFAULT 'TRANSFER',
  `jumlah` double(11,0) NOT NULL DEFAULT '0',
  `id_rekening` int NOT NULL,
  `keterangan` varchar(255),
  `catatan` text,
  `foto` varchar(255) DEFAULT NULL,
  `status_verifikasi` enum('PENDING', 'VERIFIED', 'REJECT') DEFAULT 'PENDING',
  `tanggal_submit` DATETIME NOT NULL DEFAULT NOW(),
  `tanggal_verifikasi` DATETIME NOT NULL,
  `id_admin` int NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id`)
);

CREATE TABLE `pengeluaran` (
  `id`int NOT NULL AUTO_INCREMENT,
  `kegiatan` varchar(255) NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `jumlah` double(11,0) NOT NULL DEFAULT '0',
  `tanggal` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `foto` varchar(255) DEFAULT NULL,
  `id_campaign_donasi` int,
  `id_admin` int NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id`)
);


ALTER TABLE `campaign_donasi`
ADD COLUMN `main_campaign` bool DEFAULT false after status;

ALTER TABLE anak_asuh
MODIFY COLUMN status ENUM('YATIM', 'PIATU', 'YATIM PIATU', 'DHUAFA');

ALTER TABLE `donasi`
MODIFY COLUMN `id_admin` int NULL;

ALTER TABLE `donasi`
DROP COLUMN `id_rekening`;

ALTER TABLE `donasi`
MODIFY COLUMN `keterangan` int NULL;


ALTER TABLE `donasi`
CHANGE COLUMN `keterangan` `donatur` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL;

ALTER TABLE `donasi`
MODIFY COLUMN `catatan` text COLLATE utf8mb4_general_ci DEFAULT NULL;

ALTER TABLE `donasi`
MODIFY COLUMN `id_campaign_donasi` int NULL;

ALTER TABLE `donatur`
ADD COLUMN `tanggal_login` DATETIME NULL AFTER `status`,
ADD COLUMN `tanggal_logout` DATETIME NULL AFTER `tanggal_login`;

ALTER TABLE anak_asuh
DROP FOREIGN KEY anak_asuh_ibfk_2;

ALTER TABLE anak_asuh
DROP COLUMN id_wali;

ALTER TABLE pengeluaran
DROP COLUMN kegiatan;

ALTER TABLE pengeluaran
add COLUMN deleted_at DATETIME default null;

ALTER TABLE `anak_asuh`
DROP COLUMN `tanggal_masuk`,
DROP COLUMN `tanggal_keluar`,
ADD COLUMN `kelas` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL AFTER `kelamin`;

ALTER TABLE donasi
ADD COLUMN deleted_at DATETIME NULL;

ALTER TABLE `donasi`
MODIFY COLUMN `tanggal_verifikasi` DATETIME NULL;