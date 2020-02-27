SELECT 
     j.Id,
	 c.[Name] AS pib,
	 ISNULL(o.Short_name,'Не вказано') AS organization,
	 j.Job_name AS jobName
     
FROM dbo.Contacts c 
INNER JOIN dbo.Jobs j ON c.Job_ID = j.Id
LEFT JOIN Organizations o ON o.Id = j.Organization_ID 
WHERE j.Is_work = 1
AND
   #filter_columns#
   #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only  ;