insert into [CRM_1551_Site_Integration].[dbo].[AppealFromSiteFiles]
  (
  [AppealFromSiteId]
      ,[File]
      ,[Name]
  )
  output [inserted].[Id]
   select @appeal_from_site_id
      ,@file
      ,@name


      IF @is_revision = 'true'
	BEGIN

 INSERT INTO [CRM_1551_Analitics].[dbo].[QuestionDocFiles]
 (
 [link]
      ,[create_date]
      ,[user_id]
      ,[edit_date]
      ,[edit_user_id]
      ,[name]
      ,[File]
      ,[question_id]
      --,[GUID]
      ,[IsArchive]
      ,[PathToArchive]
 )

 SELECT
 NULL [link]
      ,GETUTCDATE() [create_date]
      ,@user_id [user_id]
      ,GETUTCDATE() [edit_date]
      ,@user_id [edit_user_id]
      ,N'answer_'+ISNULL(@name,N'') [name]
      ,@file [File]
      ,(SELECT TOP 1 [Questions].Id
  FROM [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  INNER JOIN [CRM_1551_Analitics].[dbo].[Appeals] ON [AppealsFromSite].Appeal_Id=[Appeals].Id
  INNER JOIN [CRM_1551_Analitics].[dbo].[Questions] ON [Appeals].Id=[Questions].appeal_id
  WHERE [AppealsFromSite].Id=@appeal_from_site_id)[question_id]
      --,[GUID]
      ,NULL [IsArchive]
      ,NULL [PathToArchive]

	END