-- DECLARE @Id INT = 153;
-- DECLARE @sort INT = 2;
IF
(@Id IS NOT NULL)
AND
(@sort IS NOT NULL)
BEGIN

UPDATE dbo.[Area]
SET sort = @sort
WHERE Id = @Id
END