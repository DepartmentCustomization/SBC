SELECT [OutsideMen].[Id]
      ,[OutsideMen].[Call_from]
      ,[OutsideMen].[Plan_date]
      ,[OutsideMen].[Finish_at]
      ,[OutsideMen].[Comment]
      ,c_c1.Name as company_name
		,c_c1.Id as company_id
      ,OutsideMen.Contact_ID as fiz_name
      ,[OutsideMen].[Claims_ID]
      ,Claims.Status_ID as claim_stat_id
      ,dbo.f_phone_number_outsideMan(OutsideMen.Company_Contact_ID) as contact_number
  FROM [dbo].[OutsideMen]
	left join Claims on Claims.Id = OutsideMen.Claims_ID
	left join Organizations as c_c1 on c_c1.Id = OutsideMen.Company_Contact_ID
	left join Contact_types on Contact_types.Id = OutsideMen.Contact_type_ID
	where [OutsideMen].[Id] = @Id