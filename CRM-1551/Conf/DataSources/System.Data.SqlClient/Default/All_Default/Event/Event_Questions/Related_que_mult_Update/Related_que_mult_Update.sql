-- DECLARE @question_id INT = 6695972;
-- DECLARE @event_id INT = 241;
-- DECLARE @user_id NVARCHAR(128) = N'016cca2b-dcd8-437e-8754-d4ff679ef6b9';

DECLARE @isCurrent BIT = (SELECT 
								CASE	
									WHEN ISNULL(event_id,0) <> @event_id 
									THEN 0 
									ELSE 1 
									END
						 FROM [dbo].[Questions] WHERE Id = @question_id
						 ); 

IF(@isCurrent = 0)
BEGIN

UPDATE
	[dbo].[Questions]
SET
	event_id = @event_id,
	[edit_date] = GETUTCDATE(),
	[user_edit_id] = @user_id
WHERE
	Id = @question_id
	AND [registration_date] >= (
		SELECT
			[start_date]
		FROM
			[dbo].[Events]
		WHERE
			Id = @event_id
	);
END

ELSE IF(@isCurrent = 1)
BEGIN
DECLARE @regNum NVARCHAR(20) = (SELECT registration_number FROM [dbo].[Questions] WHERE Id = @question_id);
DECLARE @msg NVARCHAR(300) = N'Питання ' + @regNum + N' вже пов`язано з заходом ' + CAST(@event_id AS NVARCHAR(10));
	RAISERROR (@msg, 16, 1);
	RETURN;
END