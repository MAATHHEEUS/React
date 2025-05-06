-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 06/05/2025 às 19:43
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cartao`
--

INSERT INTO `cartao` (`id_card`, `id_cliente_card`, `identificacao_card`, `nome_card`, `numero_card`, `bandeira_card`, `cvv_card`, `situacao_card`, `tipo_card`, `vencimento_card`) VALUES
(1, 6, 'Cartão 1', 'Jão Cavalo edit', '56156156165651', 'Visa Débito', '888', 'A', 'Preferencial', '10/2025'),
(2, 6, 'Cartão 3', 'Jão Cavalo', '1561561651', 'Master', '910', 'I', 'Secundário', '02/2030'),
(3, 1, 'CARD GOLDI', 'CLICLCI', '000.6565.5455.0000', 'vISO', '123', 'A', 'pREF', '02/2029'),
(4, 8, 'Crédito', 'Apelido 3 da Silva', '0000123400001234', 'Visa Platinum', '125', 'A', 'Preferencial', '11/2029');

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
  `senha` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome_cliente`, `email_cliente`, `nasc_cliente`, `CPF_cliente`, `telefone_cliente`, `situacao_cliente`, `senha`) VALUES
(1, 'User alterado 2', 'email1@email', '1999-01-15', '75546644411', NULL, 'A', '666'),
(5, 'Nome', 'emaiteste@teste', '1999-06-15', '16551615616', NULL, 'I', '555'),
(6, 'nda editado', 'X@email', '1995-06-15', '3424234243242', NULL, 'A', '123'),
(8, 'Apelido 3', 'cad123@email.com', '1988-04-16', '45600012311', NULL, 'A', '12345678@Aa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cupons`
--

DROP TABLE IF EXISTS `cupons`;
CREATE TABLE IF NOT EXISTS `cupons` (
  `id_cupom` int NOT NULL AUTO_INCREMENT,
  `cod_cupom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `id_cli_cupom` int NOT NULL,
  `valor_cupom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status_cupom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_cupom`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cupons`
--

INSERT INTO `cupons` (`id_cupom`, `cod_cupom`, `id_cli_cupom`, `valor_cupom`, `status_cupom`) VALUES
(6, 'CT-1#eLkq', 1, '14,99', 'I'),
(5, 'CT-1#VCIG', 1, '2,00', 'I'),
(4, 'CT-1#s69k', 1, '14,99', 'I'),
(9, 'CT-1#DIP9', 1, '298.56', 'A'),
(10, 'CT-8#ckCD', 8, '14.99', 'A');

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id_end`, `id_cliente_end`, `identificacao_end`, `tipo`, `cep_end`, `rua_end`, `numero_end`, `bairro_end`, `cidade`, `UF`, `situacao_end`) VALUES
(1, 5, 'Casa', 'Cobrança', '0851565', 'Rua m', '15', 'Bairro', 'Cidade', 'UF', 'A'),
(2, 5, 'Escritório', 'Entrega', '4981651165', 'XXX', '51', 'Bairrin', 'Cid', 'SP', 'A'),
(18, 6, 'EEE', 'Cobrança Edit', '432432', 'rr', '3', 'www', 'ASS', 're', 'A'),
(17, 6, 'XXX', 'Tipo Edit 2', '43242', 'rr', '33', 'rr', 'Teste', 'ss', 'I'),
(16, 6, 'ee', 'Cobrança', '61551656', 'rr', '32', 'rr', 'ASS', 'ss', 'I'),
(19, 1, 'END CLI 1', 'COBRA', '000-12345', 'rUA 23', '63', 'dUBAIRRO', 'gOTHAM', 'MARVEL', 'A'),
(20, 8, 'Endereço x', 'CObrança', '000-00000', 'Rua Teste 2.0', '8', 'Jardim Buraco Fundo', 'Suxano', 'SP', 'A');

-- --------------------------------------------------------

--
-- Estrutura para tabela `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `transacao_log` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `data_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tabela_log` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dados_log` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `log`
--

INSERT INTO `log` (`log_id`, `transacao_log`, `data_log`, `tabela_log`, `dados_log`) VALUES
(2, 'INSERT', '2025-05-06 10:35:50', 'cliente', 'id: 8; nome: Apelido; email: cad123@email.com; nascimento: 1988-04-16; CPF: 45600012311;'),
(3, 'UPDATE', '2025-05-06 10:36:36', 'cliente', 'id: 8; nome: Apelido 3; email: cad123@email.com; nascimento: 1988-04-16; CPF: 45600012311; senha: ;'),
(4, 'UPDATE', '2025-05-06 11:12:27', 'cliente', 'id: 8; nome: Apelido 3; email: cad123@email.com; nascimento: 1988-04-16; CPF: 45600012311; senha: 12345678@Aa;'),
(5, 'INSERT', '2025-05-06 11:14:50', 'endereco', 'id: 20; identificacao: Endereço x; tipo: CObrança; cep: 000-00000; rua: Rua Teste 2.0; numero: 8; bairro: Jardim Buraco Fundo; UF: SP; cidade: Suxano;'),
(6, 'INSERT', '2025-05-06 11:16:24', 'cartao', 'id: 4; cliente: 8; identificacao: Crédito; tipo: Preferencial; nome: Apelido 3 da Silva; cvv: 125; numero: 0000123400001234; bandeira: Visa Platinum; vencimento: 11/2029;'),
(7, 'INSERT', '2025-05-06 11:17:11', 'venda', 'id: 46; cliente: 8; cartão: 4; endereço: 20; cupons:  / ; total: 35.98; frete: 12.96;'),
(8, 'INSERT', '2025-05-06 11:24:56', 'venda', 'id: 47; cliente: 8; cartão: 4; endereço: 20; cupons:  / ; total: 35.98; frete: 12.96;'),
(9, 'INSERT', '2025-05-06 11:24:56', 'vendaproduto', 'venda: 47; produto: 4; quantidade: 3; status: \"EM PROCESSAMENTO\";'),
(10, 'INSERT', '2025-05-06 11:24:56', 'vendaproduto', 'venda: 47; produto: 1; quantidade: 2; status: \"EM PROCESSAMENTO\";'),
(11, 'UPDATE', '2025-05-06 11:24:56', 'produto', 'id: 4; quantidade decrementada: 3;'),
(12, 'UPDATE', '2025-05-06 11:24:56', 'produto', 'id: 1; quantidade decrementada: 2;'),
(14, 'INSERT', '2025-05-06 11:31:26', 'venda', 'id: 48; cliente: 8; cartão: 4; endereço: 20; cupons:  / ; total: 14.99; frete: 12.96;'),
(15, 'INSERT', '2025-05-06 11:31:26', 'vendaproduto', 'venda: 48; produto: 1; quantidade: 1; status: \"EM PROCESSAMENTO\";'),
(16, 'UPDATE', '2025-05-06 11:31:26', 'produto', 'id: 1; quantidade decrementada: 1;'),
(17, 'UPDATE', '2025-05-06 11:32:08', 'vendaproduto', 'id: 43; status: TROCA1;'),
(18, 'UPDATE', '2025-05-06 11:33:25', 'vendaproduto', 'id: 42; status: TROCA1;'),
(19, 'UPDATE', '2025-05-06 11:33:25', 'venda', 'id: 47; status: TROCA1;'),
(20, 'UPDATE', '2025-05-06 11:34:43', 'vendaproduto', 'id: 43; status: TROCA AUTORIZADA1;'),
(21, 'UPDATE', '2025-05-06 11:34:43', 'venda', 'id: 48; status: TROCA AUTORIZADA1;'),
(22, 'UPDATE', '2025-05-06 11:34:43', 'produto', 'id: 1; quantidade incrementada: 1;'),
(23, 'INSERT', '2025-05-06 11:35:15', 'cupons', 'id: 10; cod: CT-8#ckCD; cliente: 8; valor: 14.99; status: A;'),
(24, 'UPDATE', '2025-05-06 11:35:15', 'vendaproduto', 'id: 43; status: CUPOM GERADO;'),
(25, 'UPDATE', '2025-05-06 11:35:15', 'venda', 'id: 48; status: CUPOM GERADO;');

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
  `estoque_prod` int DEFAULT NULL,
  PRIMARY KEY (`id_prod`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id_prod`, `nome_prod`, `valor_prod`, `imagem_prod`, `situacao_prod`, `estoque_prod`) VALUES
(1, 'Produto 2 xxxxx yyyyyyy zzzzzzzzz', '14,99', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A', 8),
(4, 'Produto', '2,00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A', 7),
(5, 'Oi', '99,52', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQils_lNi36_g5x_Jceh0DMhh0IDoYWc_vSZdUUuoiaBg&s', 'A', 3);

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
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `venda`
--

INSERT INTO `venda` (`id_ven`, `id_cliente_ven`, `id_end_ven`, `id_card_ven`, `cupons_ven`, `total_ven`, `frete_ven`, `status_ven`) VALUES
(48, 8, 20, 4, ' / ', '14.99', '12.96', 'CUPOM GERADO'),
(47, 8, 20, 4, ' / ', '35.98', '12.96', 'TROCA1'),
(45, 1, 19, 3, ' / ', '10.00', '12.96', 'EM PROCESSAMENTO'),
(46, 8, 20, 4, ' / ', '35.98', '12.96', 'EM PROCESSAMENTO'),
(44, 1, 19, 3, ' / ', '10.00', '12.96', 'EM PROCESSAMENTO'),
(43, 1, 19, 3, 'BLFRIDAY / CT-1#s69k', '298.56', '12.96', 'CUPOM GERADO'),
(41, 1, 19, 3, ' / CT-1#VCIG', '14.99', '12.96', 'CUPOM GERADO'),
(42, 1, 19, 3, ' / CT-1#eLkq', '2.00', '12.96', 'EM TRANSITO'),
(37, 1, 19, 3, 'BLACK FRIDAY - CP', '16.99', '12.96', 'CUPOM GERADO'),
(36, 1, 19, 3, 'BLACK FRIDAY - CP', '4.00', '12.96', 'CUPOM GERADO');

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
  `status_vdp` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_vdp`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vendaproduto`
--

INSERT INTO `vendaproduto` (`id_vdp`, `id_ven_vdp`, `id_prod_vdp`, `quantidade_vdp`, `status_vdp`) VALUES
(32, 37, 1, 1, 'CUPOM GERADO'),
(31, 37, 4, 1, 'CUPOM GERADO'),
(30, 36, 4, 2, 'CUPOM GERADO'),
(37, 42, 4, 1, 'EM TRANSITO'),
(36, 41, 1, 1, 'CUPOM GERADO'),
(38, 43, 5, 3, 'CUPOM GERADO'),
(39, 44, 4, 5, 'EM PROCESSAMENTO'),
(40, 45, 4, 5, 'EM PROCESSAMENTO'),
(41, 47, 4, 3, 'EM PROCESSAMENTO'),
(42, 47, 1, 2, 'TROCA1'),
(43, 48, 1, 1, 'CUPOM GERADO');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
