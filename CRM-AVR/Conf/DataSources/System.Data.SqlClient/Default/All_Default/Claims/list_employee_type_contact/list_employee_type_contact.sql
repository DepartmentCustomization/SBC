SELECT [Id]
      ,[Name]
      ,[Parent_Organization_ID]
      ,[Short_name]
  FROM [CRM_AVR_Analitics].[dbo].[Organizations]
  where Is_activ = 1 
  and Id = @org_id
-- 21-08-19	and Parent_Organization_ID in (select id from Organizations where id = @org_id or Parent_Organization_ID =@org_id) 
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only