SELECT us.[Id]
	  ,org.Name
	  ,[CRM_AVR_System].dbo.fn_full_org_struct (org.Id) as full_name
  FROM [CRM_AVR_System].[dbo].[UserInOrganisation] as us
  left join [CRM_AVR_System].[dbo].OrganisationStructure as org on org.Id = us.OrganisationStructureId
  where us.UserId = @user
  and #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only