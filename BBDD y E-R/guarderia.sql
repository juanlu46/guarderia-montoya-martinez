-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-03-2016 a las 21:04:47
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
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`DNI`, `NOMBRE`, `APELLIDOS`, `EDAD`, `CONTACTO`, `DIRECCION`, `GRUPO`) VALUES
('1234', 'jghjgh', 'hgfjjfg', 1, 545, 'fghfd', 'A'),
('48122420A', 'Juan Luis', 'Montoya', 20, 666170642, 'C/Teresa de jesus,3', ''),
('567857', 'FJFKH', 'JHKGJKHK', 6, 67967, 'HJLHJ', 'A'),
('63456436', 'JFHJ', 'FJHJFG', 45, 56767, 'KGHKJGKGH', 'A'),
('85678', 'GHLKGF', 'LGHKH', 4, 878967, 'KLHLHJ', 'A'),
('87678', 'ytryrt', 'etyer', 1, 5645, 'ghfmng', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alum_extra`
--

CREATE TABLE `alum_extra` (
  `DNI_ALUMNO` varchar(9) NOT NULL,
  `ID_EXTRAESCOLAR` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alum_extra`
--

INSERT INTO `alum_extra` (`DNI_ALUMNO`, `ID_EXTRAESCOLAR`) VALUES
('48122420A', 1),
('48122420A', 2),
('567857', 1),
('63456436', 1),
('63456436', 2),
('85678', 1);

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
-- Volcado de datos para la tabla `extraescolares`
--

INSERT INTO `extraescolares` (`ID`, `DESCRIPCION`, `FECHA`) VALUES
(1, 'JFGJFHJ', '2016-03-02'),
(2, 'FGJFFG', '2016-03-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `ID` varchar(1) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`ID`, `DESCRIPCION`) VALUES
('A', 'dgdfgdf');

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
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`DNI`);

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
  ADD PRIMARY KEY (`DNI`);

--
-- Restricciones para tablas volcadas
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
