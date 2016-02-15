-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2016 a las 18:13:27
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guarderia`
--
CREATE DATABASE IF NOT EXISTS `guarderia` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `guarderia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `DNI` varchar(9) NOT NULL,
  `NOMBRE` varchar(15) NOT NULL,
  `APELLIDOS` varchar(30) NOT NULL,
  `EDAD` int(2) NOT NULL,
  `CONTACTO` int(9) NOT NULL,
  `DIRECCION` varchar(50) NOT NULL,
  `GRUPO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `alumnos`:
--   `GRUPO`
--       `grupos` -> `ID`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alum_extra`
--

CREATE TABLE `alum_extra` (
  `DNI_ALUMNO` varchar(9) NOT NULL,
  `ID_EXTRAESCOLAR` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `alum_extra`:
--   `DNI_ALUMNO`
--       `alumnos` -> `DNI`
--   `ID_EXTRAESCOLAR`
--       `extraescolares` -> `ID`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extraescolares`
--

CREATE TABLE `extraescolares` (
  `ID` int(3) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL,
  `FECHA` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `extraescolares`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `ID` varchar(1) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `grupos`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `DNI_ALUMNO` varchar(9) NOT NULL,
  `EVALUACION` varchar(2) NOT NULL,
  `CURSO_ESCOLAR` varchar(9) NOT NULL,
  `MATERIA1` varchar(20) DEFAULT NULL,
  `NOTA1` varchar(20) DEFAULT NULL,
  `MATERIA2` varchar(20) DEFAULT NULL,
  `NOTA2` varchar(20) DEFAULT NULL,
  `MATERIA3` varchar(20) DEFAULT NULL,
  `NOTA3` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `notas`:
--   `DNI_ALUMNO`
--       `alumnos` -> `DNI`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `DNI` varchar(9) NOT NULL,
  `NOMBRE` varchar(15) NOT NULL,
  `APELLIDOS` varchar(30) NOT NULL,
  `TELEFONO` int(9) NOT NULL,
  `GRUPO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `profesor`:
--   `GRUPO`
--       `grupos` -> `ID`
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`DNI`),
  ADD UNIQUE KEY `GRUPO` (`GRUPO`);

--
-- Indices de la tabla `alum_extra`
--
ALTER TABLE `alum_extra`
  ADD PRIMARY KEY (`DNI_ALUMNO`,`ID_EXTRAESCOLAR`),
  ADD KEY `FK_EX_EX` (`ID_EXTRAESCOLAR`);

--
-- Indices de la tabla `extraescolares`
--
ALTER TABLE `extraescolares`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`DNI_ALUMNO`,`EVALUACION`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`DNI`),
  ADD UNIQUE KEY `GRUPO` (`GRUPO`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `FK_AL_GP` FOREIGN KEY (`GRUPO`) REFERENCES `grupos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alum_extra`
--
ALTER TABLE `alum_extra`
  ADD CONSTRAINT `FK_AL_EX` FOREIGN KEY (`DNI_ALUMNO`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_EX_EX` FOREIGN KEY (`ID_EXTRAESCOLAR`) REFERENCES `extraescolares` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `FK_AL_NT` FOREIGN KEY (`DNI_ALUMNO`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `FK_PF_GP` FOREIGN KEY (`GRUPO`) REFERENCES `grupos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Metadatos
--
USE `phpmyadmin`;

--
-- Metadatos para alumnos
--

--
-- Metadatos para alum_extra
--

--
-- Metadatos para extraescolares
--

--
-- Metadatos para grupos
--

--
-- Metadatos para notas
--

--
-- Metadatos para profesor
--

--
-- Metadatos para guarderia
--

--
-- Volcado de datos para la tabla `pma__relation`
--

INSERT INTO `pma__relation` (`master_db`, `master_table`, `master_field`, `foreign_db`, `foreign_table`, `foreign_field`) VALUES
('guarderia', 'ALUM_EXTRA', 'DNI_ALUMNO', 'guarderia', 'alumnos', 'DNI');

--
-- Volcado de datos para la tabla `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('guarderia', '1');

SET @LAST_PAGE = LAST_INSERT_ID();

--
-- Volcado de datos para la tabla `pma__table_coords`
--

INSERT INTO `pma__table_coords` (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`) VALUES
('guarderia', 'alum_extra', @LAST_PAGE, 102, 15),
('guarderia', 'alumnos', @LAST_PAGE, 377, 14),
('guarderia', 'extraescolares', @LAST_PAGE, 103, 142),
('guarderia', 'grupos', @LAST_PAGE, 601, 182),
('guarderia', 'notas', @LAST_PAGE, 845, 9),
('guarderia', 'profesor', @LAST_PAGE, 375, 219);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
