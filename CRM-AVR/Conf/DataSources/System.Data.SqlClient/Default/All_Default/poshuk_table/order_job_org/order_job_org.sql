select DISTINCT isnull(org.Id,-1) Id, case when org.Id is null then N'(не вказано)' else Short_name end Name,
Short_name
from  
   Jobs j  
	LEFT JOIN Organizations org ON org.Id = j.Organization_ID
   where (LEN(org.Short_name) > 0 or org.Id is null) and #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only