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
SELECT * FROM common_data_permission_group_user_mapping ump
JOIN common_data_permission_group_mapping gmp ON ump.group_id=gmp.group_id
JOIN common_data_permission_group g ON g.id=ump.group_id
WHERE ump.user_id IN(1) AND gmp.permission_type=1

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


  SELECT u.id userId,u.is_charge ower,d.id departmentId,d.status departmentState FROM USER u RIGHT JOIN
        (
            SELECT tree.id,tree.status FROM(
                SELECT
                @ids AS _ids,
                (   SELECT @ids := GROUP_CONCAT(id)
                    FROM organization
                    WHERE FIND_IN_SET(pid, @ids)
                ) AS cids
                FROM organization,
                (SELECT @ids := (SELECT organization_id FROM USER WHERE id=10)) b
                WHERE @ids IS NOT NULL
            ) id, organization tree
            WHERE FIND_IN_SET(tree.id, _ids)
            ORDER BY id
        ) d ON u.organization_id=d.id AND u.status=0
