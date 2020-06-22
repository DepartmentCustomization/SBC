    -- DECLARE @Id INT = 1;
    -- DECLARE @del_text NVARCHAR(MAX) = N'Deletator commento';
    -- DECLARE @userId NVARCHAR(128) = N'0022a2aa-facd-4b2b-bade-f4ddcc7a0c53';
    -- DECLARE @place_find_id INT = 9797;

DECLARE @placeLogID INT = (
    SELECT
        TOP 1 Id
    FROM
        dbo.[Places_LOG]
    WHERE
        Place_ID = @Id
);

SET
	XACT_ABORT ON;

BEGIN TRY 
BEGIN TRANSACTION;

DECLARE @type INT = (SELECT Place_type_ID FROM dbo.[Places] WHERE Id = @Id);

IF(@type <> 19)
BEGIN
UPDATE 
	dbo.[Houses]
SET [Is_Active] = 3
WHERE Id = (SELECT Street_id FROM dbo.[Places] WHERE Id = @Id);
END

UPDATE
    dbo.[Places]
SET
    [Is_Active] = 3
WHERE
    [Id] = @Id;

UPDATE
    dbo.[Places_LOG]
SET
    [Update_by] = @userId,
    [Update_date] = GETUTCDATE(),
    [Action] = N'Delete'
WHERE
    Id = @placeLogID;

DECLARE @entityData NVARCHAR(100) = (
    SELECT
        [Object]
    FROM
        dbo.[Places_LOG]
    WHERE
        Id = @placeLogID
);

DECLARE @entity NVARCHAR(20) = (
    SELECT
        value
    FROM
        STRING_SPLIT(@entityData, ' ')
    ORDER BY
        (
            SELECT
                1
        ) OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY
);

DECLARE @entityID INT = (
    SELECT
        value
    FROM
        STRING_SPLIT(@entityData, ' ')
    ORDER BY
        (
            SELECT
                1
        ) OFFSET 1 ROWS FETCH NEXT 1 ROW ONLY
);

DECLARE @userCreator NVARCHAR(128) = (
    SELECT
        [Created_by]
    FROM
        dbo.[Places_LOG]
    WHERE
        Id = @placeLogID
);

---> Когда выбрано место из существующих
IF(@place_find_id IS NOT NULL) 
BEGIN 
IF(@entity = N'Заявка') 
BEGIN
UPDATE
    dbo.[Claim_Order_Places]
SET
    [Place_ID] = @place_find_id
WHERE
    [Claim_ID] = @entityID
	AND [Place_ID] = @Id ;
END
ELSE IF(@entity = N'Маршрут')
BEGIN
UPDATE 
	dbo.[AreaObject]
SET [PlacesID] = @place_find_id
WHERE [PlacesID] = @Id;
END 
DELETE 
FROM dbo.[Places_LOG]
WHERE Id = @placeLogID ; 

DELETE 
FROM dbo.[Places]
WHERE Id = @Id ;
END 
---> Выбрать создателя и отдел, отвечающий за исполнение сущности
IF OBJECT_ID('tempdb..#notifyRecipients') IS NOT NULL 
BEGIN
	DROP TABLE #notifyRecipients;
END
CREATE TABLE #notifyRecipients (UserID NVARCHAR(128)) 
                                WITH (DATA_COMPRESSION = PAGE);

DECLARE @executorOrg INT;
IF(@entity = N'Заявка')
BEGIN
	SET @executorOrg = (SELECT Response_organization_ID FROM dbo.[Claims] WHERE Id = @entityID);
	INSERT INTO #notifyRecipients (UserID)
	SELECT 
		[SystemUser_Id]
	FROM dbo.[SysUser_OrgWC]
	WHERE OrganizationWC_Id = @executorOrg
	UNION 
	SELECT @userCreator ;
END
ELSE IF(@entity = N'Маршрут')
BEGIN
	SET @executorOrg = (SELECT OrgId FROM dbo.[Route] WHERE Id = @entityID);
	INSERT INTO #notifyRecipients (UserID)
	SELECT 
		[SystemUser_Id]
	FROM dbo.[SysUser_OrgWC]
	WHERE OrganizationWC_Id = @executorOrg
	UNION 
	SELECT @userCreator ;
END

DECLARE @notifyTypeID SMALLINT = (
    SELECT
        Id
    FROM
        CRM_AVR_System.dbo.[NotificationType]
    WHERE
        [Code] = N'NewTemporaryPlace'
);

DECLARE @notifyText NVARCHAR(250) = N'Тимчасове місце по ' + CASE
    WHEN @entity = N'Заявка' THEN N'заявці '
	WHEN @entity = N'Маршрут' THEN N'маршруту '
END + CASE 
	WHEN @entity = N'Заявка' THEN (SELECT [Claim_Number] FROM dbo.[Claims] WHERE Id = @entityID)
	WHEN @entity = N'Маршрут' THEN (SELECT [Number] FROM dbo.[Route] WHERE Id = @entityID)
END
 + N' оброблено. Результат: ' + @del_text ;
---> Отправить нотификации на отобранных юзеров
INSERT INTO
    CRM_AVR_System.dbo.[Notification] (
        [CreatedOn],
        [NotificationTypeId],
        [SenderId],
        [Text],
        [NotificationPriorityId],
        [RecipientId],
        [Read],
        [HasAudio]
    )
SELECT 
        CURRENT_TIMESTAMP,
        @notifyTypeID,
        @userId,
        @notifyText,
        2,
        n.UserID,
        0,
        1
  FROM #notifyRecipients n
  INNER JOIN CRM_AVR_System.dbo.[User] u ON n.UserID = u.UserId COLLATE Ukrainian_CI_AS;

COMMIT TRANSACTION;
SELECT
    N'OK' AS result;
END TRY 
BEGIN CATCH 
IF (XACT_STATE()) = -1 
BEGIN 
	DECLARE @Message NVARCHAR(MAX) = ERROR_MESSAGE();
	RAISERROR(@Message, 16, 1);
	ROLLBACK TRANSACTION;

END;
END CATCH;