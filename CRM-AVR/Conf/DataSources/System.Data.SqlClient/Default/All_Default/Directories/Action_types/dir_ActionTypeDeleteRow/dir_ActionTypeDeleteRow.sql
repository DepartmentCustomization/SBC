-- DECLARE @Id INT = 447;

DECLARE @Action_type_Place_type_Id TABLE (Id INT);
DECLARE @Claim_type_action_type_Id TABLE (Id INT);

--> Cписок связанных типов заявок для типа работы
INSERT INTO @Claim_type_action_type_Id
SELECT 
	[Id]
FROM [dbo].Claim_type_action_type
WHERE Action_type_Id = @Id;

--> Cписок связанных типов мест для типа работы
INSERT INTO @Action_type_Place_type_Id
SELECT 
	[Id]
FROM [dbo].[Action_type_Place_type]
WHERE Action_type_Id = @Id;

--> Если тип работ привязан к типу заявки
IF (SELECT 
		COUNT(1)
	FROM @Claim_type_action_type_Id) > 0
BEGIN
	RAISERROR(N'Робота пов`язана з типами Заявки', 16, 1);
	RETURN;
END

--> Если тип работ использован в выезде
IF (SELECT 
		COUNT(1)
	FROM [dbo].[Actions] 
	WHERE [Action_type_ID] IN (SELECT 
									[Id] 
							   FROM @Action_type_Place_type_Id)
	) > 0
BEGIN 
	RAISERROR(N'Робота не буде видалена, тому що була використана у Виїздах', 16, 1);
	RETURN;
END

DELETE FROM 
	[dbo].[Action_type_Place_type]
WHERE Id IN (SELECT 
				[Id] 
			 FROM @Action_type_Place_type_Id);

DELETE FROM
    [dbo].[Action_types]
WHERE
    Id = @Id;