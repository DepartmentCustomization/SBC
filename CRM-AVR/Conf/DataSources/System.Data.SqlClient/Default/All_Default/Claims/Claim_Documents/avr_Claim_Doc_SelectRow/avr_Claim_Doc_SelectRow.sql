SELECT [Claim_Documents].[Id]
      ,[Claim_Documents].[Name]
      ,[Claim_Documents].[Type_Id]
      ,[Claim_Documents].[Claims_Id]
      ,[Claim_Documents].[Comments]
  FROM [dbo].[Claim_Documents]
  where [Id] = @Id