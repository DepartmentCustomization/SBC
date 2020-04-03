select Id,  
--[Number]
concat(number,Letter) as number_let
from Houses 
where Street_id = (SELECT [Street_Id] FROM [dbo].[Streets] where Id = @str_id)
and 	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only