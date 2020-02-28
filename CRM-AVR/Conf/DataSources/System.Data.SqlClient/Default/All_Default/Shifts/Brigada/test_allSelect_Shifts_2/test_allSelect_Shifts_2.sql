SELECT [Jobs].[Id]
	  ,Contacts.Name as contacts_name
      ,[Jobs].[Job_name] as job_name
      ,Positions.Name as positions_name
      ,Organizations.Name as organizations_name
  FROM [dbo].[Jobs]
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
where Jobs.Is_work = 1 and Contacts.Contact_type_ID in (3,4) and Organizations.Id @OrgID
-- and Jobs.Organization_ID = @org_id
	and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
