# apps
个人开源项目


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
