-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 29, 2019 at 09:58 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `film`
--

CREATE TABLE `film` (
  `film_id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_bin NOT NULL,
  `film_picture` varchar(80) COLLATE utf8_bin NOT NULL,
  `genre` varchar(60) COLLATE utf8_bin NOT NULL,
  `durasi` int(11) NOT NULL,
  `released_date` date NOT NULL,
  `detail` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `film`
--

INSERT INTO `film` (`film_id`, `title`, `film_picture`, `genre`, `durasi`, `released_date`, `detail`) VALUES
(1, 'Weathering With You (天気の子)', 'tenki no ko.jpg', 'Drama, Fantasy, Romance, Slice of Life', 114, '2019-07-19', 'The summer of his high school freshman year, Hodaka runs away from his remote island home to Tokyo, and quickly finds himself pushed to his financial and personal limits. The weather is unusually gloomy and rainy every day, as if to suggest his future. He lives his days in isolation, but finally finds work as a writer for a mysterious occult magazine. Then one day, Hodaka meets Hina on a busy street corner. This bright and strong-willed girl possesses a strange and wonderful ability: the power to stop the rain and clear the sky...'),
(2, 'Avengers: Endgame', 'avengers endgame.jpeg', 'Action, Adventure, Fantasy, Superhero, Science Fiction', 182, '2019-04-24', 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.'),
(3, 'Gundala', 'gundala.jpg', 'Action, Drama, Superhero', 123, '2019-08-29', 'Indonesia\'s preeminent comic book superhero and his alter ego Sancaka enter the cinematic universe to battle the wicked Pengkor and his diabolical squad of orphan assassins.'),
(4, 'Midsommar', 'midsommar.jpeg', 'Drama, Horror, Mystery', 187, '2019-09-07', 'A couple travel to Sweden to visit their friend\'s rural hometown for its fabled midsummer festival, but what begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.'),
(5, 'One Piece: Stampede', 'stampede.jpeg', 'Fantasy, Action', 101, '2019-09-18', 'The world\'s boldest buccaneers set sail for the great Pirate Festival, where the Straw Hats join a mad-dash race to find Gol D.Roger\'s treasure. There\'s just one little problem. An old member of Roger\'s crew has a sinister score to settle. All bets are off when the most iconic pirates of One Piece history band together for a swashbuckling showdown, the likes of which have never been seen!'),
(6, 'Twiceland', 'twiceland.jpeg', 'Documentary', 110, '2018-12-07', 'The girl group Twice\'s big-screen film is the movie version of their world tour \'Twiceland Zone 2: Fantasy Park\'.'),
(7, 'Ad Astra', 'ad astra.jpeg', 'Adventure, Drama, Mystery', 123, '2019-09-20', 'Astronaut Roy McBride undertakes a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.');

-- --------------------------------------------------------

--
-- Table structure for table `film_review`
--

CREATE TABLE `film_review` (
  `user_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `film_review`
--

INSERT INTO `film_review` (`user_id`, `film_id`, `rating`, `review`) VALUES
(1, 2, 8, ' adadawd'),
(2, 1, 5, 'Lumayan lah'),
(3, 1, 10, 'Best film ever in the history of anime. 10/10 bakal nonton lagi karena saya sangat suka film ini.'),
(3, 2, 2, 'meh'),
(3, 3, 10, 'Best ever');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user_id` int(11) NOT NULL,
  `cookies` varchar(40) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user_id`, `cookies`) VALUES
(1, 'wTutpxkEGQh5Cxfu6sNXM9LyBndwIiWh9aSYItBC'),
(3, 'LdF3ROUnhExI0edSRUYQzeVFq1VTkMi9t5BMg10e');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `available_seat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `film_id`, `date`, `time`, `available_seat`) VALUES
(1, 1, '2019-09-03', '18:30:00', 10),
(2, 1, '2019-09-30', '23:30:00', 25),
(3, 3, '2019-09-14', '17:00:00', 30),
(4, 3, '2019-09-30', '18:30:00', 6),
(5, 2, '2019-09-25', '15:06:00', 5),
(6, 6, '2019-11-05', '15:02:00', 40),
(7, 3, '2019-09-09', '15:02:00', 0),
(8, 7, '2019-09-20', '12:00:00', 5),
(9, 7, '2019-09-21', '12:31:26', 53),
(10, 4, '2019-09-08', '10:21:22', 10),
(11, 5, '2019-09-21', '13:31:26', 50),
(12, 5, '2019-10-01', '17:31:26', 50);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `film_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`film_id`, `schedule_id`, `seat`, `user_id`) VALUES
(1, 2, 1, 1),
(1, 2, 2, 1),
(1, 2, 3, 1),
(1, 2, 5, 1),
(1, 2, 7, 1),
(1, 2, 8, 1),
(1, 2, 10, 1),
(1, 2, 13, 1),
(1, 2, 17, 1),
(1, 2, 19, 1),
(1, 2, 22, 1),
(3, 4, 2, 1),
(3, 4, 5, 1),
(3, 4, 6, 1),
(6, 6, 2, 1),
(6, 6, 30, 1),
(7, 8, 1, 1),
(7, 8, 2, 1),
(7, 8, 5, 1),
(1, 1, 8, 2),
(4, 10, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(60) COLLATE utf8_bin NOT NULL,
  `email` varchar(60) COLLATE utf8_bin NOT NULL,
  `phone_number` varchar(12) COLLATE utf8_bin NOT NULL,
  `password` varchar(40) COLLATE utf8_bin NOT NULL,
  `profile_picture` varchar(80) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `phone_number`, `password`, `profile_picture`) VALUES
(1, 'AdityaPutraS', 'adityaputra159@gmail.com', '089123456789', 'test1234', NULL),
(2, 'antonio wahyu', 'antonio@email.com', '123456789012', 'abcde', 'animeKids.jpeg'),
(3, 'mingtaros', 'mingtaros@mail.com', '123456789013', '1234', 'animeKids.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`);

--
-- Indexes for table `film_review`
--
ALTER TABLE `film_review`
  ADD PRIMARY KEY (`user_id`,`film_id`),
  ADD KEY `review_film_id` (`film_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_film_id` (`film_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`film_id`,`schedule_id`,`seat`),
  ADD KEY `ticket_user_id` (`user_id`),
  ADD KEY `ticket_schedule_id` (`schedule_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `film`
--
ALTER TABLE `film`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `film_review`
--
ALTER TABLE `film_review`
  ADD CONSTRAINT `review_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_schedule_id` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
