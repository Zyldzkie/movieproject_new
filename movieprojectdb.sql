-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 04:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 310, 'dsadas', '\"Bruce Nolan toils as a \"human interest\" television reporter in Buffalo, NY, but despite his high ratings and the love of his beautiful girlfriend, Bruce remains unfulfilled. At the end of the worst day in his life, he angrily ridicules God - and the Almighty responds, endowing Bruce with all of His divine powers.', 57.52, '2003-05-23', 6.715, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//3X', 0, '2024-09-26 09:53:29', '0000-00-00 00:00:00'),
(2, 7, 310, 'HALPPP', '\"Bruce Nolan toils as a \"human interest\" television reporter in Buffalo, NY, but despite his high ratings and the love of his beautiful girlfriend, Bruce remains unfulfilled. At the end of the worst day in his life, he angrily ridicules God - and the Almighty responds, endowing Bruce with all of His divine powers.', 57.52, '2003-05-23', 6.715, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//3XJKBKh9Km89EoUEitVTSnrlAkZ.jpg', 0, '2024-10-26 09:51:09', '0000-00-00 00:00:00'),
(3, 7, 42884, 'Cinderella', 'Cinderella chafes under the cruelty of her wicked stepmother and her evil stepsisters, until her Fairy Godmother steps in to change her life for one unforgettable night. At the ball, she falls for handsome Prince Christopher, whose parents, King Maximillian and Queen Constantina, are anxious for him to find a suitable paramour.', 14.038, '1997-11-02', 6.5, 'https://image.tmdb.org/t/p/original//y9OZCg6OUqtDMtedW9Pr6mSL09y.jpg', 'https://image.tmdb.org/t/p/original//54awQrtekrsI11bKg2NwQrBHLIe.jpg', 0, '2024-10-26 09:51:42', '0000-00-00 00:00:00'),
(4, 7, 10151, 'Snow White', 'fdsfds', 1.945, '2005-08-07', 5.8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//gig1yOIhv6WLULwvKmUzxwlQPhA.jpg', 0, '2024-10-27 04:51:51', '0000-00-00 00:00:00'),
(6, 7, 1104327, 'Jajabara 2.0', 'When two strangers meet by a fluke they open up about their criminal past. While one retains the crime, the other seeks redemption.', 0.534, '2024-03-22', 10, 'https://image.tmdb.org/t/p/original//4jyS0rD9bX0emh0TO1v68QwjgPv.jpg', 'https://image.tmdb.org/t/p/original//2vR6p2TkrPtGrtTjGO3CCCjH5ir.jpg', 0, '2024-10-27 06:56:57', '0000-00-00 00:00:00'),
(7, 7, 397564, 'Snow', 'A section from ROLLS: 1971, which I feel stands well on its own. The continuous field of falling snow appears to break into three planes or zones of different density and speed. I think of Snow in some sense as nature\'s answer to SPRAY. - Robert Huot', 0.339, '1971-05-15', 0, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original/null', 0, '2024-11-22 16:23:11', '0000-00-00 00:00:00'),
(9, 10, 211672, 'Minions', 'Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.', 26.806, '2015-06-17', 6.4, 'https://image.tmdb.org/t/p/original//c7xTZ9EA6GpH72xJC5s0x0KKR1a.jpg', 'https://image.tmdb.org/t/p/original//dr02BdCNAUPVU07aOodwPYv6HCf.jpg', 0, '2024-12-05 18:46:24', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` int(11) NOT NULL,
  `description` int(11) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'admin'),
(10, 'cas@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'cas', 'NA', 'cinco', '09736279738', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
