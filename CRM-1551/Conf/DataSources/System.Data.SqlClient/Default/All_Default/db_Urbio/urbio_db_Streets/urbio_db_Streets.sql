--declare @treatment_is bit='false';
 -- declare @street_name nvarchar(500)=N'Теремковская';
  --Додавання
SELECT Id, Analitics_Id, Urbio_Id, [operations], [UrbioName], [1551Name], is_done, comment, [is_done_filter], [StreetName_filter]
FROM
  (
  SELECT ISNULL(LTRIM(sa.Id),N'')+ISNULL(LTRIM(su.Id),N'') Id, sa.Id Analitics_Id, su.Id Urbio_Id,
  N'Додавання' [operations],
  ISNULL(su.[name_shortToponym],N'')+ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'') [UrbioName],
  ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'') [1551Name],
  su.is_done, su.comment
  ,su.is_done is_done_filter
  ,su.id [StreetName_filter]
  FROM [CRM_1551_URBIO_Integrartion].[dbo].[streets] su
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] sa ON su.id=sa.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[StreetTypes] sta ON sa.street_type_id=sta.Id
  WHERE sa.urbio_id IS null

  --редагування
  union all
  SELECT ISNULL(LTRIM(sa.Id),N'')+ISNULL(LTRIM(su.Id),N'') Id, sa.Id Analitics_Id, su.Id Urbio_Id,
  N'Редагування' [operations],
  ISNULL(su.[name_shortToponym],N'')+ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'') [UrbioName],
  ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'') [1551Name],
  su.is_done, su.comment
  ,su.is_done is_done_filter
  ,su.id [UrbioName_filter]
  FROM [CRM_1551_URBIO_Integrartion].[dbo].[streets] su
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] sa ON CONVERT(nvarchar(128),su.id)=sa.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[StreetTypes] sta ON sa.street_type_id=sta.Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Districts] d on sa.district_id=d.urbio_id
  WHERE 
  -- ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  -- ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'')<>ISNULL(sa.name,N'')
  ISNULL(su.[name_shortToponym],N'')+ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'')<>ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'')


  OR d.urbio_id<>su.ofDistrict_id
  OR ISNULL(d.name,N'')<>ISNULL(su.ofDistrict_name_fullName,N'')

  --видалення
  union all
  SELECT ISNULL(LTRIM(sa.Id),N'')+ISNULL(LTRIM(su.Id),N'') Id, sa.Id Analitics_Id, su.Id Urbio_Id,
  N'Видалення' [operations],
  ISNULL(su.[name_shortToponym],N'')+ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'') [UrbioName],
  ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'') [1551Name],
  su.is_done, su.comment
  ,su.is_done is_done_filter
  ,su.id [UrbioName_filter]
  FROM [CRM_1551_Analitics].[dbo].[Streets] sa 
  LEFT JOIN [CRM_1551_URBIO_Integrartion].[dbo].[streets] su ON CONVERT(nvarchar(128),su.id)=sa.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[StreetTypes] sta ON sa.street_type_id=sta.Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Districts] d on sa.district_id=d.Id 
  WHERE sa.urbio_id IS NULL
  ) t
  WHERE #filter_columns#
   #sort_columns#
   offset @pageOffsetRows rows fetch next @pageLimitRows rows only

--   SELECT sa.urbio_id Id, --N'Додавання' [operations],
--   CASE WHEN su.is_add='true' THEN N'Додавання'
--   WHEN su.is_change='true' THEN N'Редагування'
--   WHEN su.is_add='true' THEN N'Видалення'
--   END [operations],
--   ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
--   ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'') [UrbioName],
--   ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'') [1551Name],
--   su.is_done, su.comment
--   ,su.is_done is_done_filter
--   ,su.id [UrbioName_filter]
--   FROM [CRM_1551_URBIO_Integrartion].[dbo].[streets] su
--   LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] sa ON su.id=sa.urbio_id
--   LEFT JOIN [CRM_1551_Analitics].[dbo].[StreetTypes] sta ON sa.street_type_id=sta.Id
--   WHERE --(su.is_add='true' OR su.is_change='true' OR su.is_delete='true') and
--   CASE WHEN su.is_add='true' THEN N'Додавання'
--   WHEN su.is_change='true' THEN N'Редагування'
--   WHEN su.is_add='true' THEN N'Видалення'
--   END is not null and
--   #filter_columns#
--   #sort_columns#
--   offset @pageOffsetRows rows fetch next @pageLimitRows rows only

