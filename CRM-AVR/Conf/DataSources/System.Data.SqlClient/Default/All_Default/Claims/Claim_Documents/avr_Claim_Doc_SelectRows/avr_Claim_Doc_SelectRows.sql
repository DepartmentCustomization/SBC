SELECT [Claim_Documents].[Id]
      ,[Claim_Documents].[Name]
      ,[Claim_Documents].[Type_Id]
      ,[Claim_Documents].[Claims_Id]
      ,[Claim_Documents].[Comments]
  FROM [dbo].[Claim_Documents]
  where [Claims_Id] = @Id
/*  
 SELECT 
		 [Type]
		,[Name]
		,Comments
 from(

SELECT 'Заявки' as [Type]
	  ,[Name]
      ,[Comments]
  FROM .[dbo].[Claim_Documents]
  where Claims_Id = @Id
 
  union all

  SELECT 'Наряди' as [Type]
	  ,[Name]
      ,[Comments]
  FROM .[dbo].[Order_Documents]
  left join Orders on Orders.Id = Orders_Id
  where Orders.Claim_ID = @Id

    union all

  SELECT 'Работи' as [Type]
	  ,[Name]
      ,[Comments]
  FROM .[dbo].[Action_Documents]
  left join Actions on Actions.Id = Actions_Id
  where Actions.Claim_ID = @Id
  ) as tab

  */
  and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only