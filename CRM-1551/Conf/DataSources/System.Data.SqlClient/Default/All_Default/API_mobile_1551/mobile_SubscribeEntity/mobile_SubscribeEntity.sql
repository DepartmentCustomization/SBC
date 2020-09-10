--  DECLARE @userId NVARCHAR(128) = N'eb6d56d2-e217-45e4-800b-c851666ce795';
--  DECLARE @entityId INT = (SELECT TOP 1 Id FROM dbo.[Assignments] WHERE assignment_state_id = 1 ORDER BY Id DESC);
--  DECLARE @entityName NVARCHAR(50) = N'assignment';
--  DECLARE @action BIT = 1;

IF (@userId IS NOT NULL)
OR (@entityId IS NOT NULL)
OR (@entityName IS NOT NULL) 
BEGIN
DECLARE @resultOK TABLE (val NVARCHAR(5));
INSERT INTO @resultOK
SELECT N'OK';

	IF (@action = 1)
	BEGIN
	DECLARE @insert_info TABLE (Id INT);
	INSERT INTO dbo.[AttentionQuestionAndEvent] ([user_id],
												 [question_id],
												 [assignment_id],
												 [event_id],
												 [create_date])
							OUTPUT inserted.Id INTO @insert_info (Id) 
							VALUES (@userId,
									IIF(@entityName = N'question', @entityId, NULL),
									IIF(@entityName = N'assignment', @entityId, NULL),
									IIF(@entityName = N'event', @entityId, NULL),
									GETDATE()
									);
	
		DECLARE @newVal INT = (SELECT TOP 1 [Id] FROM @insert_info);
	
		IF(@newVal IS NOT NULL)
		BEGIN 
			SELECT 
				val AS result
			FROM @resultOK
			WHERE #filter_columns#
				ORDER BY 1
			OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
		END
	END
	ELSE IF (@action = 0)
	BEGIN
	DECLARE @ass_id INT = IIF(@entityName = 'assignment', @entityId, NULL);
	DECLARE @que_id INT = IIF(@entityName = 'question', @entityId, NULL);
	DECLARE @eve_id INT = IIF(@entityName = 'event', @entityId, NULL);
	DECLARE @delete_info TABLE (Id INT);

	DECLARE @att_id INT = (
		SELECT 
			[Id] 
		FROM dbo.[AttentionQuestionAndEvent] 
		WHERE [user_id] = @userId
			  AND ISNULL([assignment_id],0) = ISNULL(@ass_id,0)
			  AND ISNULL([question_id],0) = ISNULL(@que_id,0)
			  AND ISNULL([event_id],0) = ISNULL(@eve_id,0)
			  );

		IF(@att_id IS NOT NULL)
		BEGIN 
			DELETE FROM dbo.[AttentionQuestionAndEvent] 
			OUTPUT deleted.Id INTO @delete_info
			WHERE [Id] = @att_id;

			DECLARE @delId INT = (SELECT TOP 1 [Id] FROM @delete_info);
			IF (@delId IS NOT NULL)
			BEGIN 
				SELECT 
					val AS result
				FROM @resultOK
				WHERE #filter_columns#
					ORDER BY 1
				OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
			END
		END
	END
END