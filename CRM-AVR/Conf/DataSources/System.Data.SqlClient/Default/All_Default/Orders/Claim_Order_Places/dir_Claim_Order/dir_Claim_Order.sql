SELECT [Orders].[Id]
      ,[Orders].[Claim_ID]
	  ,  case when len (concat(N'Наряд № ' + cast([Orders].[Id] as nvarchar), + N' по заявці № ' + cast([Orders].[Claim_ID] as nvarchar)))= 0 
		then NULL else concat(N'Наряд № ' + cast([Orders].[Id] as nvarchar), + N' по заявці № ' + cast([Orders].[Claim_ID] as nvarchar)) end as order_number
  FROM [dbo].[Orders]
  left join Claims on Claims.Id = Orders.Claim_ID
  
  where Claims.Id = @claim_id 
and	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only