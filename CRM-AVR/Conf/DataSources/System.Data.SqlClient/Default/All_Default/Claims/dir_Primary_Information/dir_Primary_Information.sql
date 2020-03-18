
select * from (
SELECT [Claims].[Id]
	,N'Тип заявки'  as pole
      ,Claim_types.Name as description
  FROM [dbo].[Claims] 
	left join Claim_types on Claim_types.Id = First_claim_type_ID
  where [Claims].Id= @Id

  union all

SELECT [Claims].[Id]
	,N'Опис проблеми'  as pole
      ,First_description as description
  FROM [dbo].[Claims]
  where [Claims].Id= @Id
) as d
order by 1
offset @pageOffsetRows rows fetch next @pageLimitRows rows only