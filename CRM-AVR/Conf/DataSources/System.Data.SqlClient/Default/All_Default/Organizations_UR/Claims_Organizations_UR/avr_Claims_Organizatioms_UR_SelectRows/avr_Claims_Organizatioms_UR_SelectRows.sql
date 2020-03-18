SELECT [Claims].[Id]
      ,[Claims].[Claim_Number] as claim_number
	  ,[Claims].[Description] as discription
	  ,[Status].[Name] as status_name
      ,[Claims].[Plan_finish_at]
      ,count(Appeals.Date) as app_date
  FROM [dbo].[Claims]
	left join Appeals on Appeals.Claim_ID = Claims.Id
	left join Contacts on Contacts.Id = Appeals.Contact_ID
	left join Status on Status.Id = Claims.Status_ID
	left join Organizations on Organizations.Contacts_ID = Contacts.Id
 WHERE Appeals.Contact_ID = (select org.Contacts_ID from Organizations org where org.Id = @Id)  
 group by [Claims].[Id]
      ,[Claims].[Claim_Number]
	  ,[Claims].[Description]
	  ,[Status].[Name]
      ,[Claims].[Plan_finish_at]
 --and
--	 #filter_columns#
  --   #sort_columns#
--offset @pageOffsetRows rows fetch next @pageLimitRows rows only
