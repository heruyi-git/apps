# apps
个人开源项目


SELECT * FROM common_data_permission_group;
SELECT * FROM common_data_permission_group_mapping;
SELECT * FROM common_data_permission_group_user_mapping

-- 组下资源SKU
SELECT gmp.id,gmp.group_id AS groupId,gmp.permission_type AS permissionType,gmp.data_code AS dataCode,gmp.data_relation_name AS dataRelationName,gmp.add_time AS ADDTIME,
p.product_type AS productType,p.small_Image_Url AS smallImageUrl,p.category,p.brand,p.name FROM common_data_permission_group_mapping gmp
JOIN e_product p ON gmp.data_code=p.sku
WHERE gmp.permission_type=4 AND gmp.group_id=1 AND p.product_type=0 AND p.category=91 AND p.brand='' AND p.name='QC2.0单口车充黑色';
-- 组下资源产品



-- 用户下站点
SELECT ump.user_id,ump.group_id,gmp.data_code FROM common_data_permission_group_user_mapping ump
JOIN common_data_permission_group_mapping gmp ON ump.group_id=gmp.group_id
JOIN common_data_permission_group g ON g.id=ump.group_id
WHERE ump.user_id IN(1,3) AND gmp.permission_type=1

-- 用户下SKU
SELECT g.group_name AS groupName,gmp.id,gmp.group_id AS groupId,gmp.permission_type AS permissionType,gmp.data_code AS dataCode,gmp.data_relation_name AS dataRelationName,gmp.add_time AS ADDTIME,
p.product_type AS productType,p.small_Image_Url AS smallImageUrl,p.category,p.brand,p.name FROM common_data_permission_group_user_mapping ump
JOIN common_data_permission_group_mapping gmp ON ump.group_id=gmp.group_id
JOIN common_data_permission_group g ON g.id=ump.group_id
JOIN e_product p ON gmp.data_code=p.sku
WHERE gmp.permission_type=4 AND ump.user_id IN(1)

-- 用户下的组
SELECT ump.*,group_name,g.group_desc,g.state,g.add_user_real_name,permission_switch FROM common_data_permission_group_user_mapping ump,common_data_permission_group g WHERE ump.group_id=g.id AND user_id = 1;

-- 组下的用户
SELECT ump.*,u.loginname,u.name,u.phone,u.email,u.is_charge,u.status,u.organization_id,u.job_id,(SELECT NAME FROM job WHERE id=u.job_id) job_name,(SELECT NAME FROM organization WHERE id=u.organization_id) organization_name FROM common_data_permission_group_user_mapping ump,erp.user u WHERE ump.user_id=u.id AND group_id = 1

-- 站点批量授权
-- SELECT m.id,(select name from e_server where id=m.server_id) as serverName,m.name,
SELECT m.id AS dataCode,s.name AS dataRelationName,m.name AS dataName,
gmp.id,gmp.group_id AS groupId,gmp.add_time AS ADDTIME
FROM e_market m
JOIN e_server s ON m.server_id=s.id
LEFT JOIN common_data_permission_group_mapping gmp ON gmp.data_code=m.id AND gmp.permission_type=1 AND gmp.group_id=1
WHERE  m.server_id='1' AND gmp.id IS NULL

-- 仓库批量授权
SELECT m.id AS dataCode,s.name AS dataRelationName,m.name AS dataName,
gmp.id,gmp.group_id AS groupId,gmp.add_time AS ADDTIME
FROM e_warehouse m
JOIN e_server s ON m.server_id=s.id
LEFT JOIN common_data_permission_group_mapping gmp ON gmp.data_code=m.id AND gmp.permission_type=2 AND gmp.group_id=1
WHERE  m.server_id='1' AND gmp.id IS NOT NULL

-- 产品批量授权
SELECT p.sku AS dataCode,p.product_type AS productType,p.small_Image_Url AS smallImageUrl,p.category,p.brand,p.name,
gmp.id,gmp.group_id AS groupId,gmp.add_time AS ADDTIME
FROM  e_product p
LEFT JOIN common_data_permission_group_mapping gmp ON gmp.data_code=p.sku
AND gmp.permission_type=4 AND gmp.group_id=1
WHERE p.product_type=0 AND p.category=91 AND p.brand='' AND p.name='QC2.0单口车充黑色';


-- begin
SELECT u.id userId,u.is_charge ower,o.id departmentId FROM erp.user u,organization o WHERE u.organization_id=o.id AND o.id=4 AND u.id=6
SELECT * FROM organization WHERE pid=2

SELECT ump.user_id,gmp.* FROM common_data_permission_group_user_mapping ump
JOIN common_data_permission_group_mapping gmp ON ump.group_id=gmp.group_id
JOIN common_data_permission_group g ON g.id=ump.group_id
WHERE ump.user_id IN(1) AND g.permission_switch & gmp.permission_type > 0 AND gmp.permission_type=1

SELECT 2&1 FROM DUAL;  data_relation_name

-- 6下的所有用户
SELECT id FROM USER u WHERE u.organization_id IN(
SELECT DATA.id FROM(
    SELECT
        @ids AS _ids,
        (   SELECT @ids := GROUP_CONCAT(id)
            FROM organization
            WHERE FIND_IN_SET(pid, @ids)
        ) AS cids,
        @l := @l+1 AS LEVEL
    FROM organization,
        (SELECT @ids := (SELECT organization_id FROM erp.user WHERE id=6), @l := 0 ) b
    WHERE @ids IS NOT NULL
) id, organization DATA
WHERE FIND_IN_SET(DATA.id, _ids)
ORDER BY LEVEL, id
) 


SELECT u2.* FROM USER AS u1 RIGHT JOIN 
(
	-- 根据用户获取部门下所有下级下用户  -- 过滤禁用部门,禁用用户,(非主管用户)禁用所有部门主管("不禁用下级主管->只禁用当前部门主管")  .(上级部门禁用->子部门禁用[如果子部门没有禁用会被级联到]),
	SELECT u.id userId,u.is_charge ower,d.id departmentId,d.status departmentState FROM USER AS u JOIN
	(
	    SELECT tree.id,tree.status FROM(
		SELECT
		@ids AS _ids,
		(   SELECT @ids := GROUP_CONCAT(id)
		    FROM organization
		    WHERE FIND_IN_SET(pid, @ids)
		) AS cids
		FROM organization,
		(SELECT @ids := (SELECT organization_id FROM USER WHERE id=1)) b
		WHERE @ids IS NOT NULL
	    ) id, organization tree
	    WHERE FIND_IN_SET(tree.id, _ids)
	    ORDER BY id
	)
	d ON u.organization_id=d.id AND u.status=1 WHERE d.status=1     
 ) AS u2  ON u1.id=u2.userId AND (u2.userId=1 OR u2.ower=0) WHERE u1.is_charge IS NOT NULL

  
   
   
   
   
   /*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.25 : Database - erp
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`erp` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `erp`;

/*Table structure for table `e_crm_ticket` */

DROP TABLE IF EXISTS `e_crm_ticket`;

CREATE TABLE `e_crm_ticket` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `market_id` int(10) NOT NULL,
  `market_name` varchar(45) DEFAULT '',
  `order_id` varchar(45) DEFAULT '',
  `source` smallint(1) unsigned NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `star` smallint(1) unsigned DEFAULT '0',
  `reply_to_email` varchar(128) DEFAULT '',
  `reply_to_name` varchar(128) DEFAULT '',
  `receiver_email` varchar(128) DEFAULT '',
  `receiver_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` blob,
  `state` smallint(1) unsigned DEFAULT NULL,
  `assign` varchar(45) DEFAULT '',
  `last_assign` varchar(45) DEFAULT '',
  `call_assign` varchar(45) DEFAULT '',
  `buyer_message` smallint(6) DEFAULT '0',
  `memo` varchar(256) DEFAULT '',
  `category` varchar(10) DEFAULT '',
  `seller_sku` varchar(45) DEFAULT '',
  `create_date` datetime DEFAULT NULL,
  `last_date` datetime DEFAULT NULL,
  `reply_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_market_order_catgory_assign_sku` (`market_id`,`order_id`,`category`,`assign`,`seller_sku`),
  KEY `idx_market_receiver_email` (`market_id`,`receiver_email`),
  KEY `idx_receiver_email` (`receiver_email`)
) ENGINE=InnoDB AUTO_INCREMENT=47088 DEFAULT CHARSET=utf8;

/*Data for the table `e_crm_ticket` */

insert  into `e_crm_ticket`(`id`,`market_id`,`market_name`,`order_id`,`source`,`source_id`,`star`,`reply_to_email`,`reply_to_name`,`receiver_email`,`receiver_name`,`subject`,`state`,`assign`,`last_assign`,`call_assign`,`buyer_message`,`memo`,`category`,`seller_sku`,`create_date`,`last_date`,`reply_date`) values (44986,1,'amazon-us','114-3995784-3945857',0,61106,3,'soulen2017_cs@163.com','Karen','xsj2zn798g990rx@marketplace.amazon.com','Misi Clark','[BLOB]',4,'Heidi','heidi','',0,NULL,'92','S12-WFBCHGC-BK','2018-08-30 00:26:50','2018-08-30 14:33:57',NULL),(46391,1,'amazon-us','111-5969378-2546656',1,68186,1,'soulen2017_cs@163.com','Karen','vl3tlhx31n1gpsj@marketplace.amazon.com','Mario F Colorado','[BLOB]',2,'Heidi','heidi','',0,'邮件拒收！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！','92','92-WFBCHGC-BK','2018-10-03 15:38:42','2018-10-17 14:41:28','2018-10-22 00:00:00'),(46739,1,'amazon-us','113-5692129-0161856',1,68200,1,'soulen2017_cs@163.com','Karen','kmn3jx8dqw3yxbf@marketplace.amazon.com','Trisha A Roth','[BLOB]',1,'Heidi','heidi','',1,NULL,'92','92-WFBCHGC-BK','2018-10-13 19:53:49','2018-10-18 10:51:41','2018-10-19 00:00:00'),(46740,1,'amazon-us','112-5200073-3724200',1,68141,4,'soulen2017_cs@163.com','Karen','ckd93vj85qc1wgc@marketplace.amazon.com','luke brunning','[BLOB]',1,'Heidi','heidi','',1,NULL,'92','92-MBU30R5FT2P-WT','2018-10-13 19:53:49','2018-10-15 11:09:34',NULL),(46741,1,'amazon-us','112-2212566-0661838',1,68581,1,'soulen2017_cs@163.com','Karen','9d0vvkw9t7727s2@marketplace.amazon.com','Renee Hetter','[BLOB]',1,'Heidi','admin','',1,'被拒收！！','92','92-FBALTAHR23FTR2P-BK','2018-10-13 19:53:49','2018-12-14 09:54:38','2018-11-02 00:00:00'),(46742,1,'amazon-us','112-8114303-1010615',1,68367,4,'soulen2017_cs@163.com','Karen','qmxw26gcplpq0zv@marketplace.amazon.com','Jen Brownlie','[BLOB]',1,'Heidi','heidi','',1,NULL,'S11','11-FBCH2RWRB12PS-BK','2018-10-13 19:53:49','2018-10-15 11:08:33',NULL),(46745,1,'amazon-us','112-6263841-2777861',1,68437,1,'soulen2017_cs@163.com','Karen','5hrtx9l78zc9jzr@marketplace.amazon.com','Doug McOwen','[BLOB]',1,'Heidi','heidi','',1,NULL,'95','95-GMT360IISMS2-BK','2018-10-13 19:53:49','2018-10-29 14:38:13','2018-11-01 00:00:00'),(46746,1,'amazon-us','113-6863079-2457069',1,68547,1,'soulen2017_cs@163.com','Karen','phwh9xl0kdgtxnc@marketplace.amazon.com','citi','[BLOB]',1,'Heidi','heidi','',1,NULL,'S11','11-FBCH2RWRB12PL-BK','2018-10-13 19:53:49','2018-10-29 15:44:41','2018-10-26 00:00:00'),(46750,1,'amazon-us','112-9737828-0981839',1,68086,3,'soulen2017_cs@163.com','Karen','69yzr3d9908hhl6@marketplace.amazon.com','Misi Clark','[BLOB]',1,'Heidi','heidi','',0,'被拒收！！','92','92-WFBCHGC-BK','2018-10-13 19:53:49','2018-10-26 14:28:01','2018-10-29 00:00:00'),(46753,1,'amazon-us','114-9579901-1137854',1,68185,1,'soulen2017_cs@163.com','Karen','n8gdjwj76g9v2y5@marketplace.amazon.com','Laura','[BLOB]',0,'Heidi','heidi','',0,'','92','92-FBCHARGE2C3FT-BK','2018-10-13 19:53:49','2018-10-29 15:47:07','2018-10-26 00:00:00'),(46754,1,'amazon-us','112-6502739-6505058',1,68231,2,'soulen2017_cs@163.com','Karen','18fs6gqsgsl89vq@marketplace.amazon.com','jose','[BLOB]',5,'Heidi','heidi','',0,NULL,'95','95-GMT360IISMS2-BK','2018-10-13 19:53:49','2018-10-29 15:46:38','2018-10-26 00:00:00'),(46825,1,'amazon-us','112-3069555-1519430',1,68438,1,'soulen2017_cs@163.com','Karen','xfhbmsb9jmggp6w@marketplace.amazon.com','Dorrestijn','[BLOB]',5,'Heidi','admin','',0,'','95','95-GMT360IISMS2-BK','2018-10-16 10:51:17','2019-06-25 20:20:42','2018-10-19 00:00:00'),(46856,1,'amazon-us','113-1160895-8209868',1,68755,1,'soulen2017_cs@163.com','Karen','s1g754q8n42xqbz@marketplace.amazon.com','Judy Beal','[BLOB]',5,'Heidi','heidi','',0,'','92','92-FBALTAHR23FTR2P-BK','2018-10-17 09:00:23','2019-06-25 20:23:03','2018-10-29 00:00:00'),(46896,1,'amazon-us','114-6935496-4910654',1,68844,3,'soulen2017_cs@163.com','Karen','0rbydf441r1ygjv@marketplace.amazon.com','Justin','[BLOB]',5,'Heidi','heidi','',0,NULL,'92','92-MBU30R5FT2P-WT','2018-10-18 12:42:38','2018-10-29 15:52:51','2018-10-29 00:00:00'),(46932,1,'amazon-us','113-0037429-0776278',1,68904,3,'soulen2017_cs@163.com','Karen','77y8szdbhgn4jb0@marketplace.amazon.com','Heather','[BLOB]',2,'Heidi','admin','',0,NULL,'92','92-WFBCHGC-BK','2018-10-19 13:53:32','2019-06-12 10:28:05','2019-06-19 00:00:00'),(46978,1,'amazon-us','114-1897261-9140208',1,68983,2,'soulen2017_cs@163.com','Karen','15616137653@163.com','Noah','[BLOB]',2,'Heidi','admin','',0,'','95','95-GMT360IISMS2-BK','2018-10-21 08:41:20','2019-06-10 15:42:48','2019-06-20 00:00:00'),(47013,1,'amazon-us','113-4328365-6721819',1,69037,4,'soulen2017_cs@163.com','Karen','829h42fnfw64lgy@marketplace.amazon.com','Agustín González Flores','[BLOB]',5,'Heidi','heidi','',0,NULL,'95','95-SMS3C1M-BK','2018-10-22 09:51:05','2018-10-25 11:40:59','2018-10-25 00:00:00'),(47085,1,'amazon-us','112-3131568-1333829',1,69113,2,'soulen2017_cs@163.com','Karen','2kkq7ssq1j450n1@marketplace.amazon.com','Annabel Lewis','[BLOB]',5,'Heidi','heidi','',0,'被拒收！！','92','92-FBALTA13FTR2P-BK','2018-10-24 09:11:38','2019-05-27 14:45:49','2018-10-31 00:00:00'),(47086,1,'amazon-us','114-8256518-0323418',1,69119,4,'soulen2017_cs@163.com','Karen','yw867czkp66ll2c@marketplace.amazon.com','amber','[BLOB]',5,'Heidi','heidi','',0,NULL,'S11','11-FBCH2RWRB12PL-BK','2018-10-24 09:11:38','2018-10-24 15:56:09',NULL),(47087,1,'amazon-us','333-3333333-3333333',1,69195,2,'1411510176@qq.com','CS','2494972403@qq.com','mike banfill','Not good quality',5,'lisi','admin','',0,'','81','81-FBCHARGE2WRB1PL-BK','2019-01-07 17:00:07','2019-05-15 10:34:18','2019-05-18 08:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

