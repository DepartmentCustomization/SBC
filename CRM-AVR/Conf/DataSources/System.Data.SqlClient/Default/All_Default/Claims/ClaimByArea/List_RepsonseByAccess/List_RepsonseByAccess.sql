SELECT 
      Id,
	  [Description],
	  [TypeAccess_ID]
	  
FROM dbo.[Response]
WHERE 
TypeAccess_ID @AccessID
AND
   #filter_columns#
   ORDER BY Id
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;