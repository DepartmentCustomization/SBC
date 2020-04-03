SELECT [Id]
      ,[Name]
      ,[Object]
      ,concat (
		case when [Object] = 'Claim' then 'Заявка'
			when [Object] = 'Orders' then 'Виїзди'
			end , + ' - ', + [Name]) as status
  FROM [dbo].[Status]
  WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
