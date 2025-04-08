-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 08/04/2025 às 15:21
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `les`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cartao`
--

DROP TABLE IF EXISTS `cartao`;
CREATE TABLE IF NOT EXISTS `cartao` (
  `id_card` int NOT NULL AUTO_INCREMENT,
  `id_cliente_card` int NOT NULL,
  `identificacao_card` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nome_card` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numero_card` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bandeira_card` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cvv_card` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `situacao_card` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A',
  `tipo_card` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vencimento_card` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_card`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cartao`
--

INSERT INTO `cartao` (`id_card`, `id_cliente_card`, `identificacao_card`, `nome_card`, `numero_card`, `bandeira_card`, `cvv_card`, `situacao_card`, `tipo_card`, `vencimento_card`) VALUES
(1, 6, 'Cartão 1', 'Jão Cavalo edit', '56156156165651', 'Visa Débito', '888', 'A', 'Preferencial', '10/2025'),
(2, 6, 'Cartão 3', 'Jão Cavalo', '1561561651', 'Master', '910', 'I', 'Secundário', '02/2030'),
(3, 1, 'CARD GOLDI', 'CLICLCI', '000.6565.5455.0000', 'vISO', '123', 'A', 'pREF', '02/2029');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email_cliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nasc_cliente` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CPF_cliente` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefone_cliente` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `situacao_cliente` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A',
  `senha` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome_cliente`, `email_cliente`, `nasc_cliente`, `CPF_cliente`, `telefone_cliente`, `situacao_cliente`, `senha`) VALUES
(1, 'User alterado 2', 'email1@email', '1999-01-15', '75546644411', NULL, 'A', '666'),
(5, 'Nome', 'emaiteste@teste', '1999-06-15', '16551615616', NULL, 'I', '555'),
(6, 'nda editado', 'X@email', '1995-06-15', '3424234243242', NULL, 'A', '123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

DROP TABLE IF EXISTS `endereco`;
CREATE TABLE IF NOT EXISTS `endereco` (
  `id_end` int NOT NULL AUTO_INCREMENT,
  `id_cliente_end` int NOT NULL,
  `identificacao_end` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cep_end` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rua_end` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numero_end` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bairro_end` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cidade` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `UF` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `situacao_end` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_end`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id_end`, `id_cliente_end`, `identificacao_end`, `tipo`, `cep_end`, `rua_end`, `numero_end`, `bairro_end`, `cidade`, `UF`, `situacao_end`) VALUES
(1, 5, 'Casa', 'Cobrança', '0851565', 'Rua m', '15', 'Bairro', 'Cidade', 'UF', 'A'),
(2, 5, 'Escritório', 'Entrega', '4981651165', 'XXX', '51', 'Bairrin', 'Cid', 'SP', 'A'),
(18, 6, 'EEE', 'Cobrança Edit', '432432', 'rr', '3', 'www', 'ASS', 're', 'A'),
(17, 6, 'XXX', 'Tipo Edit 2', '43242', 'rr', '33', 'rr', 'Teste', 'ss', 'I'),
(16, 6, 'ee', 'Cobrança', '61551656', 'rr', '32', 'rr', 'ASS', 'ss', 'I'),
(19, 1, 'END CLI 1', 'COBRA', '000-12345', 'rUA 23', '63', 'dUBAIRRO', 'gOTHAM', 'MARVEL', 'A');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `id_prod` int NOT NULL AUTO_INCREMENT,
  `nome_prod` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `valor_prod` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagem_prod` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `situacao_prod` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_prod`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id_prod`, `nome_prod`, `valor_prod`, `imagem_prod`, `situacao_prod`) VALUES
(1, 'Produto 2 xxxxx yyyyyyy zzzzzzzzz', '14,99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A'),
(4, 'Produto', '2,00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A'),
(5, 'Oi', '99,52', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A');

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda`
--

DROP TABLE IF EXISTS `venda`;
CREATE TABLE IF NOT EXISTS `venda` (
  `id_ven` int NOT NULL AUTO_INCREMENT,
  `id_cliente_ven` int NOT NULL,
  `id_end_ven` int NOT NULL,
  `id_card_ven` int NOT NULL,
  `cupons_ven` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `total_ven` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `frete_ven` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status_ven` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_ven`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendaproduto`
--

DROP TABLE IF EXISTS `vendaproduto`;
CREATE TABLE IF NOT EXISTS `vendaproduto` (
  `id_vdp` int NOT NULL AUTO_INCREMENT,
  `id_ven_vdp` int NOT NULL,
  `id_prod_vdp` int NOT NULL,
  `quantidade_vdp` int NOT NULL,
  PRIMARY KEY (`id_vdp`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
