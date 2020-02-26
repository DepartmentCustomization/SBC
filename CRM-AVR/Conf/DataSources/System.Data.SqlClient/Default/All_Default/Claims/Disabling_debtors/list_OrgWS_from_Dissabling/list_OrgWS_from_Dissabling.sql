SELECT [Id]
      ,[Name]
  FROM [dbo].[Organizations]
  where Is_WC = 1 and Is_selected =1 and Organizations.Id @OrgID
  and Id != 28 --or Id= @Id
and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only