SELECT [Id]
      ,[Name]
      
  FROM [dbo].[Claim_types]
where TypeAccess_ID = @access_id
--and Parent_сlaim_types_ID is null

	and  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only