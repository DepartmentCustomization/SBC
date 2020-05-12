

IF(@appeal_from_site_id) IS NOT NULL 
BEGIN
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
END

IF (@appeal_id IS NULL
AND @appeal_from_site_id IS NOT NULL
AND @is_revision = 'true') OR (select WorkDirectionTypeId
from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
where id=@appeal_from_site_id)=20
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
ELSE 

IF (@appeal_id IS NOT NULL
AND @is_revision = 'true') OR (select WorkDirectionTypeId
from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
where id=@appeal_from_site_id)=20
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
            appeal_id = @appeal_id
    ) [question_id],
    --,[GUID]
    NULL [IsArchive],
    NULL [PathToArchive] ;
END