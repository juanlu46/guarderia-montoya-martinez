-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2016 a las 20:07:53
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
('42584536F', 'Andrea', 'Martín', 3, 96547851, 'alvarez quintero 8', 'C'),
('47458515A', 'Marta', 'Blesa', 1, 954782147, 'abedul 7 ', 'A'),
('54871245K', 'Raúl', 'González ', 2, 955873514, 'andalucia 3 ', 'B'),
('65478912J', 'Saúl', 'Guzman', 3, 645789235, 'olmo 12 ', 'C');

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
('42584536F', 1234),
('47458515A', 1234),
('47458515A', 4742),
('54871245K', 4742);

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
(1234, 'Excursión al museo', '2016-03-31'),
(4742, 'Excursión al parque', '2016-04-21');

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
('A', 'A partir de un año'),
('B', 'A partir de dos años'),
('C', 'A partir de tres años');

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
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`DNI_ALUMNO`, `EVALUACION`, `CURSO_ESCOLAR`, `MATERIA1`, `NOTA1`, `MATERIA2`, `NOTA2`, `MATERIA3`, `NOTA3`) VALUES
('42584536F', '1º', '2015/2016', 'Plastica', 'Suficiente', 'Psicomotricidad', 'Notable', 'Comportamiento', 'Sobresaliente'),
('47458515A', '2º', '2015/2016', 'Estimulación verbal', 'Notable', 'Estimulación visual', 'Sobresaliente', 'Estimulación sensori', 'Suficiente');

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
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`DNI`, `NOMBRE`, `APELLIDOS`, `TELEFONO`, `GRUPO`) VALUES
('32547865I', 'Silvia', 'Sousa', 745123698, 'C'),
('52456987A', 'Jose Manuel', 'Herrera', 958744145, 'A'),
('65478512P', 'María', 'Castro', 954783214, 'B');

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
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `FK_AL_NT` FOREIGN KEY (`DNI_ALUMNO`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
