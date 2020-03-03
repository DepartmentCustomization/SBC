SELECT 1 Id, 'false' [Row], N'Неопрацьовані' [Name]
  UNION ALL
  SELECT 2 Id, 'true' [Row], N'Опрацьовані' [Name]
  UNION ALL
  SELECT 3 Id, null [Row], N'Усі' [Name]