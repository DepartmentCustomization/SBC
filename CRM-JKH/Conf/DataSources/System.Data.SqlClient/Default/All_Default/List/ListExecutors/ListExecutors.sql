
--declare @ClaimId int = 2


declare @organization_id int = (Select top 1 e.organization_id 
								from [dbo].[claims] as c
								left join [dbo].[employees] as e on e.Id = c.executor_id
								where  c.Id = @ClaimId)

select  id as Id,
		 PIB as [Name]
from  [dbo].[employees]
where organization_id = @organization_id
and #filter_columns#
  #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
option (OPTIMIZE FOR UNKNOWN)