SELECT [Id]
      ,[Claim_ID]
      ,[Actions_ID]
      ,[Description]
      ,[Created_at]
      ,[Fact_finish_at]
  FROM [dbo].[Sequela]
  where Id = @Id