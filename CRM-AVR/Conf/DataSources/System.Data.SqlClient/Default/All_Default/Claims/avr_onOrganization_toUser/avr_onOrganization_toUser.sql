SELECT 
     Organizations.Id,
     Organizations.Name
	from Jobs 
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	where [Login] = @user ;