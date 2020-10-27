-- DECLARE @Id INT = 447;

DECLARE @Action_type_Place_type_Id TABLE (Id INT);

--> Cписок связанных типов мест для типа работы
INSERT INTO @Action_type_Place_type_Id
SELECT 
	[Id]
FROM [dbo].[Action_type_Place_type]
WHERE Action_type_Id = @Id;

--> Если тип работ использован в выезде
IF (SELECT 
		COUNT(1)
	FROM [dbo].[Actions] 
	WHERE [Action_type_ID] IN (SELECT 
									[Id] 
							   FROM @Action_type_Place_type_Id)
	) > 0
	AND @Name <> (SELECT 
					[Name] 
			  FROM [dbo].[Action_types] 
			  WHERE Id = @Id)
BEGIN 
	RAISERROR(N'Робота не буде змінена, тому що була використана у Виїздах', 16, 1);
	RETURN;
END

UPDATE
  [dbo].[Action_types]
SET
  [Name] = @Name,
  [Is_move] = @Is_move,
  TypeAccess_ID = @TypeAccess_ID,
  Plan_duration = @Plan_duration,
  Units_Id = @Units_Id
WHERE
  Id = @Id;