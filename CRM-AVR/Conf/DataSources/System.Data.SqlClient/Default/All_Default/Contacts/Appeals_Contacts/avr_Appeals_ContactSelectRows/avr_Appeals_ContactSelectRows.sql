SELECT distinct 
      [Claims].[Id]
      ,concat('Заявка № ', Claims.Claim_Number) as claim_number
	  ,[Claims].[Description] as discription
	  ,[Status].[Name] as status_name
      ,[Claims].[Plan_finish_at]
  FROM [dbo].[Claims]
	left join Appeals on Appeals.Claim_ID = Claims.Id
	left join Contacts on Contacts.Id = Appeals.Contact_ID
	left join Status on Status.Id = Claims.Status_ID
--  WHERE Appeals.Contact_ID = @Id  and
 WHERE Claims.Contact_ID = @Id  and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
