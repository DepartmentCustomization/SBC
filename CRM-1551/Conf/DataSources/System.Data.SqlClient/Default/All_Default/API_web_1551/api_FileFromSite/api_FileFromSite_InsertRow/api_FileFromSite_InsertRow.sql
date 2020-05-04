
INSERT INTO
    [CRM_1551_Site_Integration].[dbo].[AppealFromSiteFiles] (
        [AppealFromSiteId],
        [File],
        [Name]
    ) 
OUTPUT [inserted].[Id]
SELECT
    @appeal_from_site_id,
    @file,
    @name ;

IF(@appeal_id) IS NULL
BEGIN 
IF @is_revision = 'true' 
BEGIN
INSERT INTO
    [CRM_1551_Analitics].[dbo].[QuestionDocFiles] (
        [link],
        [create_date],
        [user_id],
        [edit_date],
        [edit_user_id],
        [name],
        [File],
        [question_id],
         --[GUID],
        [IsArchive],
        [PathToArchive]
    )
SELECT
    NULL [link],
    GETUTCDATE() [create_date],
    @user_id [user_id],
    GETUTCDATE() [edit_date],
    @user_id [edit_user_id],
    N'answer_' + ISNULL(@name, N'') [name],
    @file [File],
    (
        SELECT
            TOP 1 [Questions].Id
        FROM
            [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] [AppealsFromSite]
            INNER JOIN [CRM_1551_Analitics].[dbo].[Appeals] [Appeals] ON [AppealsFromSite].Appeal_Id = [Appeals].Id
            INNER JOIN [CRM_1551_Analitics].[dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
        WHERE
            [AppealsFromSite].Id = @appeal_from_site_id
    ) [question_id],
    --,[GUID]
    NULL [IsArchive],
    NULL [PathToArchive] ;
END
END 
ELSE IF(@appeal_id) IS NOT NULL
BEGIN
IF @is_revision = 'true' 
BEGIN
INSERT INTO
    [CRM_1551_Analitics].[dbo].[QuestionDocFiles] (
        [link],
        [create_date],
        [user_id],
        [edit_date],
        [edit_user_id],
        [name],
        [File],
        [question_id],
         --[GUID],
        [IsArchive],
        [PathToArchive]
    )
SELECT
    NULL [link],
    GETUTCDATE() [create_date],
    @user_id [user_id],
    GETUTCDATE() [edit_date],
    @user_id [edit_user_id],
    N'answer_' + ISNULL(@name, N'') [name],
    @file [File],
    (
        SELECT
            TOP 1 [Questions].Id
        FROM dbo.[Questions]
        WHERE
            [Appeal_Id].Id = @appeal_id
    ) [question_id],
    --,[GUID]
    NULL [IsArchive],
    NULL [PathToArchive] ;
END
END