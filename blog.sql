-- phpMyAdmin SQL Dump
-- version 3.5.8
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 08 月 21 日 18:25
-- 服务器版本: 5.1.33-community
-- PHP 版本: 5.2.9-2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zjwdb_573358`
--

-- --------------------------------------------------------

--
-- 表的结构 `blog_blog`
--

CREATE TABLE IF NOT EXISTS `blog_blog` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `blog_blog`
--

INSERT INTO `blog_blog` (`id`, `title`, `content`, `date`) VALUES
(11, '如何在CSS中实现父选择器效果', '浏览器解析HTML文档，是从前往后，由外及里的。所以，我们时常会看到页面先出现头部然后主体内容再出现的加载情况。', '2015-08-21 18:14:22'),
(12, '使用meta实现页面的定时刷新或跳转', '大家可以看到，meta跳转，使用方便，不用写JS，不用会后台代码，定时跳转刷新什么的玩得照样很溜，而且兼容性好，为啥总感觉不温不火，很少看见有人提及呢？', '2015-07-01 11:15:47'),
(13, 'IE下zoom或Matrix矩阵滤镜中心点变换实现', '然而，IE的Matrix矩阵变换，或者zoom缩放会改变元素原本占据的展示尺寸，位置等，与CSS3优雅的transform完全不一样，导致，我们需要对IE做额外的偏移。上面提到的工具就自动计算出了应有的margin偏移大小', '2014-06-13 15:16:19');

-- --------------------------------------------------------

--
-- 表的结构 `blog_skin`
--

CREATE TABLE IF NOT EXISTS `blog_skin` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `small_bg` varchar(200) NOT NULL,
  `big_bg` varchar(200) NOT NULL,
  `bg_color` varchar(200) NOT NULL,
  `bg_text` varchar(200) NOT NULL,
  `bg_flag` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `blog_skin`
--

INSERT INTO `blog_skin` (`id`, `small_bg`, `big_bg`, `bg_color`, `bg_text`, `bg_flag`) VALUES
(1, 'small_bg1.png', 'bg1.jpg', '#E7E9E8', '皮肤1', 0),
(2, 'small_bg2.png', 'bg2.jpg', '#ECF0FC', '皮肤2', 0),
(3, 'small_bg3.png', 'bg3.jpg', '#E2E2E2', '皮肤3', 0),
(4, 'small_bg4.png', 'bg4.jpg', '#FFFFFF', '皮肤4', 0),
(5, 'small_bg5.png', 'bg5.jpg', '#F3F3F3', '皮肤5', 0),
(6, 'small_bg6.png', 'bg6.jpg', '#EBDEBE', '皮肤6', 1);

-- --------------------------------------------------------

--
-- 表的结构 `blog_user`
--

CREATE TABLE IF NOT EXISTS `blog_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `pass` char(40) NOT NULL,
  `ques` varchar(200) NOT NULL,
  `ans` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `ps` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=68 ;

--
-- 转存表中的数据 `blog_user`
--

INSERT INTO `blog_user` (`id`, `user`, `pass`, `ques`, `ans`, `email`, `birthday`, `ps`) VALUES
(67, 'cai', '105c34090af195c48d0664b6e8248a3a981e22e4', '2', '狂吠', '10000@qq.com', '2013-07-24', '11');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
