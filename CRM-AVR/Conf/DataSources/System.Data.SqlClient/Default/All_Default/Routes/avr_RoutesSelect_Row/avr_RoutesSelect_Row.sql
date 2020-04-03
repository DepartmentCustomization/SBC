select 
	r.Id
	,r.Id as route_id
	,r.Number
	,org.Short_name
	,org.Id as OrgId
	--,Author_userID
	--,ChangeBy_userID
	,concat(u.FirstName, ' ', u.LastName) as Author_userID
	,concat(u2.FirstName, ' ', u2.LastName) as ChangeBy_userID
	,ROUND(GroupLenght,2) as GroupLenght
	,BoreCountAll
	from dbo.[Route] as r
		left join Organizations as org on org.Id = r.OrgId
		left join [CRM_AVR_System].[dbo].[User] as u on u.UserId = r.Author_userID
		left join [CRM_AVR_System].[dbo].[User] as u2 on u2.UserId = r.ChangeBy_userID
	WHERE r.Id = @Id