SELECT 
     j.Id,
	 c.[Name] AS pib,
	 o.Short_name AS organization,
	 j.Job_name AS jobName
     
FROM dbo.Contacts c 
INNER JOIN dbo.Jobs j ON c.Job_ID = j.Id
INNER JOIN Organizations o ON o.Id = j.Organization_ID 
WHERE j.Is_work = 1 
AND o.Id @UserDepartment
AND
  #filter_columns#
  #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only  ;