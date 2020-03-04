--declare @treatment_is bit='false';
--declare @build_name nvarchar(500)=N'Теремковская';
   

SELECT Id, buid_Id Analitics_Id, addressObject_Id Urbio_Id, [operations], Urbio_build, Urbio_District, [1551_District], [1551_Build], is_done_filter is_done, comment,
is_done_filter, name_fullName_filter [BuildName_filter]
FROM
(
select ISNULL(LTRIM(b.Id),N'')+ISNULL(LTRIM(ao.Id),N'') Id, b.Id buid_Id, ao.Id addressObject_Id,
  N'Додавання' [operations]
  ,ao.ofDistrict_name_fullName Urbio_District
  ,d.name [1551_District], ISNULL(st.shortname+N' ',N'')+ISNULL(s.name+N' ', N'')+ISNULL(b.name,N'') [1551_Build], ao.comment
  , ISNULL(ao.ofStreet_name_shortName+N' ', N'')+ISNULL(ao.[name_ofFirstLevel_fullName],N'') Urbio_build
  , ao.is_done is_done_filter
  , ao.Id name_fullName_filter
  from [CRM_1551_URBIO_Integrartion].[dbo].[addressObject] ao
  left join [CRM_1551_Analitics].[dbo].[Buildings] b on ao.id=b.urbio_id
  left join [CRM_1551_Analitics].[dbo].[Streets] s on b.street_id=s.Id
  left join [CRM_1551_Analitics].[dbo].[StreetTypes] st on s.street_type_id=st.Id
  left join [CRM_1551_Analitics].[dbo].[Districts] d on ao.[ofDistrict_id]=d.[urbio_id]
  where b.urbio_id is null

 -- редагування
 UNION ALL
 select ISNULL(LTRIM(b.Id),N'')+ISNULL(LTRIM(ao.Id),N'') Id, b.Id buid_Id, ao.Id addressObject_Id,
  N'Редагування' [operations]
  ,ao.ofDistrict_name_fullName Urbio_District
  ,d.name [1551_District], ISNULL(st.shortname+N' ',N'')+ISNULL(s.name+N' ', N'')+ISNULL(b.name,N'') [1551_Build], ao.comment
  , ISNULL(ao.ofStreet_name_shortName+N' ', N'')+ISNULL(ao.[name_ofFirstLevel_fullName],N'') Urbio_build
  , ao.is_done is_done_filter
  , ao.Id name_fullName_filter
  from [CRM_1551_URBIO_Integrartion].[dbo].[addressObject] ao
  INNER JOIN [CRM_1551_Analitics].[dbo].[Buildings] b on ao.id=b.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] o ON b.Id=o.builbing_id
  left join [CRM_1551_Analitics].[dbo].[Streets] s on b.street_id=s.Id
  left join [CRM_1551_Analitics].[dbo].[StreetTypes] st on s.street_type_id=st.Id
  left join [CRM_1551_Analitics].[dbo].[Districts] d on ao.[ofDistrict_id]=d.[urbio_id]
  where b.urbio_id is null

  --удаление
  UNION ALL
  select ISNULL(LTRIM(b.Id),N'')+ISNULL(LTRIM(ao.Id),N'') Id, b.Id buid_Id, ao.Id addressObject_Id, 
  N'Видалення' [operations]
  ,ao.ofDistrict_name_fullName Urbio_District
  ,d.name [1551_District], ISNULL(st.shortname+N' ',N'')+ISNULL(s.name+N' ', N'')+ISNULL(b.name,N'') [1551_Build], ao.comment
  , ISNULL(ao.ofStreet_name_shortName+N' ', N'')+ISNULL(ao.[name_ofFirstLevel_fullName],N'') Urbio_build
  , ao.is_done is_done_filter
  , ao.Id name_fullName_filter
  from [CRM_1551_URBIO_Integrartion].[dbo].[addressObject] ao
  RIGHT JOIN [CRM_1551_Analitics].[dbo].[Buildings] b on ao.id=b.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] o ON b.Id=o.builbing_id
  left join [CRM_1551_Analitics].[dbo].[Streets] s on b.street_id=s.Id
  left join [CRM_1551_Analitics].[dbo].[StreetTypes] st on s.street_type_id=st.Id
  left join [CRM_1551_Analitics].[dbo].[Districts] d on ao.[ofDistrict_id]=d.[urbio_id]--ao.DistrictId_1551=d.Id
  where ao.id is null
  ) t
  where #filter_columns#
  #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only