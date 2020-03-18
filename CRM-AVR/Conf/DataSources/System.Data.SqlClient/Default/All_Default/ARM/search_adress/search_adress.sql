select 0 as col1, N'Всі місця'  as col2
union all
SELECT [Id]
      ,[Name]
    
  FROM [dbo].[Places]
WHERE Name like '%'+@Adress+'%'