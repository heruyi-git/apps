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


56ZS5PQ1RF-eyJsaWNlbnNlSWQiOiI1NlpTNVBRMVJGIiwibGljZW5zZWVOYW1lIjoi5q2j54mI5o6I5p2DIC4iLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiRm9yIGVkdWNhdGlvbmFsIHVzZSBvbmx5IiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJJSSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IkFDIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiRFBOIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiUFMiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJHTyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IkRNIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiQ0wiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSUzAiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSQyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IlJEIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJSTSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IldTIiwicGFpZFVwVG8iOiIyMDIwLTAzLTEwIn0seyJjb2RlIjoiREIiLCJwYWlkVXBUbyI6IjIwMjAtMDMtMTAifSx7ImNvZGUiOiJEQyIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9LHsiY29kZSI6IlJTVSIsInBhaWRVcFRvIjoiMjAyMC0wMy0xMCJ9XSwiaGFzaCI6IjEyMjkxNDk4LzAiLCJncmFjZVBlcmlvZERheXMiOjAsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2UsImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-SYSsDcgL1WJmHnsiGaHUWbaZLPIe2oI3QiIneDtaIbh/SZOqu63G7RGudSjf3ssPb1zxroMti/bK9II1ugHz/nTjw31Uah7D0HqeaCO7Zc0q9BeHysiWmBZ+8bABs5vr25GgIa5pO7CJhL7RitXQbWpAajrMBAeZ2En3wCgNwT6D6hNmiMlhXsWgwkw2OKnyHZ2dl8yEL+oV5SW14t7bdjYGKQrYjSd4+2zc4FnaX88yLnGNO9B3U6G+BuM37pxS5MjHrkHqMTK8W3I66mIj6IB6dYXD5nvKKO1OZREBAr6LV0BqRYSbuJKFhZ8nd6YDG20GvW6leimv0rHVBFmA0w==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO/5oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/78TmVqFl8nOeD5+07B8VEaIu7c3E1N+e1doC6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSVq9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxFjnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQAF8uc+YJOHHwOFcPzmbjcxNDuGoOUIP+2h1R75Lecswb7ru2LWWSUMtXVKQzChLNPn/72W0k+oI056tgiwuG7M49LXp4zQVlQnFmWU1wwGvVhq5R63Rpjx1zjGUhcXgayu7+9zMUW596Lbomsg8qVve6euqsrFicYkIIuUu4zYPndJwfe0YkS5nY72SHnNdbPhEnN8wcB2Kz+OIG0lih3yz5EqFhld03bGp222ZQCIghCTVL6QBNadGsiN/lWLl4JdR3lJkZzlpFdiHijoVRdWeSWqM4y0t23c92HXKrgppoSV18XMxrWVdoSM3nuMHwxGhFyde05OdDtLpCv+jlWf5REAHHA201pAU6bJSZINyHDUTB+Beo28rRXSwSh3OUIvYwKNVeoBY+KwOJ7WnuTCUq1meE6GkKc4D/cXmgpOyW/1SmBz3XjVIi/zprZ0zf3qH5mkphtg6ksjKgKjmx1cXfZAAX6wcDBNaCL+Ortep1Dh8xDUbqbBVNBL4jbiL3i3xsfNiyJgaZ5sX7i8tmStEpLbPwvHcByuf59qJhV/bZOl8KqJBETCDJcY6O2aqhTUy+9x93ThKs1GKrRPePrWPluud7ttlgtRveit/pcBrnQcXOl1rHq7ByB8CFAxNotRUYL9IF5n3wJOgkPojMy6jetQA5Ogc8Sm7RG6vg1yow==
