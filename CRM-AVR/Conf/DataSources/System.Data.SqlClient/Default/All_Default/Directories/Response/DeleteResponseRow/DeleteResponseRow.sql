-- DECLARE @Id INT = 1;

DECLARE @Name NVARCHAR(255) = (SELECT [Description] FROM dbo.[Response] WHERE Id = @Id);
DECLARE @DontTouch NVARCHAR(100) = N'Зауважень немає';

IF(@Name <> @DontTouch)
    BEGIN 
    DELETE 
    FROM dbo.Response
    WHERE Id = @Id ;
    
    SELECT 'OK';
END

ELSE 
BEGIN
    RAISERROR('УВАГА! Видалення заборонено.',16,1);
    RETURN;
END