SELECT [OutsideMen].[Id]
      ,c_c1.Name as company_name
      ,OutsideMen.Contact_ID as fiz_name
      ,[OutsideMen].[Call_from]
      ,[OutsideMen].[Plan_date]
      ,[OutsideMen].[Finish_at]
      ,[OutsideMen].[Comment]
      ,[OutsideMen].[Claims_ID]
  FROM [dbo].[OutsideMen]
	left join Claims on Claims.Id = OutsideMen.Claims_ID
	left join [Organizations] as c_c1 on c_c1.Id = OutsideMen.Company_Contact_ID
	left join Contact_types on Contact_types.Id = OutsideMen.Contact_type_ID
where [OutsideMen].[Claims_ID] = @Id
and 
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
