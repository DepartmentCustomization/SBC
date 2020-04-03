SELECT 
     r.Id,
	 r.Number
FROM dbo.[Route] r
LEFT JOIN dbo.Organizations org ON org.Id = r.OrgId
WHERE org.Id @UserDepartment
AND #filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;