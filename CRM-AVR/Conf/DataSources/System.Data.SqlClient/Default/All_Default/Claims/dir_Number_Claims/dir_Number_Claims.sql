SELECT [Claims].[Id]
      ,concat('Заявка № ', Claims.Claim_Number) as Claim_Number
FROM [dbo].[Claims]
WHERE [Claims].[Id]= @Id
	
union all

SELECT [Claims].[Id]
      ,concat('Клас заявки: ','"', Claim_classes.Name,'"') as classes_name
FROM [dbo].[Claims]
	left join Claim_classes on Claim_classes.Id = Claims.Claim_class_ID
WHERE [Claims].[Id]= @Id
and 
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only