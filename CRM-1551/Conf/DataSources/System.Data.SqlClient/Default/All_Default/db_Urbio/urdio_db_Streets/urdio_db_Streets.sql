--declare @treatment_is bit='false';
 -- declare @street_name nvarchar(500)=N'Теремковская';
  

  SELECT sa.urbio_id Id, --N'Додавання' [operations],
  CASE WHEN su.is_add='true' THEN N'Додавання'
  WHEN su.is_change='true' THEN N'Редагування'
  WHEN su.is_add='true' THEN N'Видалення'
  END [operations],
  ISNULL(su.name_fullName+N' ', N'')+ISNULL(su.uniqueMarker_fullText+N' ',N'')+
  ISNULL(su.history_fullName+N' ', N'')+ISNULL(su.history_shortToponym+N' ',N'') [UrbioName],
  ISNULL(sta.shortname,N'')+ISNULL(sa.name,N'') [1551Name],
  su.is_done, su.comment
  ,su.is_done is_done_filter
  ,su.id [UrbioName_filter]
  FROM [CRM_1551_URBIO_Integrartion].[dbo].[streets] su
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] sa ON su.id=sa.urbio_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[StreetTypes] sta ON sa.street_type_id=sta.Id
  WHERE --(su.is_add='true' OR su.is_change='true' OR su.is_delete='true') and
  CASE WHEN su.is_add='true' THEN N'Додавання'
  WHEN su.is_change='true' THEN N'Редагування'
  WHEN su.is_add='true' THEN N'Видалення'
  END is not null and
  #filter_columns#
  #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only