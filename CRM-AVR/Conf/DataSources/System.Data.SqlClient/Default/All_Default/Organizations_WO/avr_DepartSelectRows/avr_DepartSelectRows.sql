SELECT 
	Id
	,Organizations.name 
  FROM [dbo].[Organizations]
 where Organizations.Id= @Id or Organizations.Id = 
    (select org.Parent_Organization_ID from  Organizations as org where org.Id=@Id)
     or Organizations.Parent_Organization_ID = @Id
 and 
 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only