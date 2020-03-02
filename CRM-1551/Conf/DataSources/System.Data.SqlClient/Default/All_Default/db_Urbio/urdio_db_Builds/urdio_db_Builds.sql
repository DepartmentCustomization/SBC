--declare @treatment_is bit='false';
--declare @build_name nvarchar(500)=N'Теремковская';
   

select ao.Id, CASE WHEN ao.is_add='true' THEN N'Додавання'
  WHEN ao.is_change='true' THEN N'Редагування'
  WHEN ao.is_add='true' THEN N'Видалення'
  END [operations], ao.ofDistrict_name_fullName Urbio_District,
  d.name [1551_District], ISNULL(st.shortname+N' ',N'')+ISNULL(s.name+N' ', N'')+ISNULL(b.name,N'') [1551_Build], ao.comment
  , ISNULL(ao.ofStreet_name_shortName+N' ', N'')+ISNULL(ao.[name_ofFirstLevel_fullName],N'') Urbio_build
  , ao.is_done is_done_filter
  , ISNULL(ao.ofStreet_name_shortName+N' ', N'')+ISNULL(ao.[name_ofFirstLevel_fullName],N'') name_fullName_filter
  from [CRM_1551_URBIO_Integrartion].[dbo].[addressObject] ao
  left join [CRM_1551_Analitics].[dbo].[Buildings] b on ao.id=b.urbio_id
  left join [CRM_1551_Analitics].[dbo].[Streets] s on b.street_id=s.Id
  left join [CRM_1551_Analitics].[dbo].[StreetTypes] st on s.street_type_id=st.Id
  left join [CRM_1551_Analitics].[dbo].[Districts] d on ao.DistrictId_1551=d.Id
  WHERE
  CASE WHEN ao.is_add='true' THEN N'Додавання'
  WHEN ao.is_change='true' THEN N'Редагування'
  WHEN ao.is_add='true' THEN N'Видалення'
  END is not null and
   #filter_columns#
  #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only