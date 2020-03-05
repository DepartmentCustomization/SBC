-- declare @Urbio_Id nvarchar(300)=N'53F7BCE4-371B-11E7-8000-000C29FF5864';
--   declare @Analitics_Id int=1;
--   declare @Operation nvarchar(200)=N'Видалення';
--   declare @comment nvarchar(100)=N'коммент';
--   declare @user_id nvarchar(128)=N'Вася';

IF @Operation=N'Видалення'
  BEGIN
		UPDATE [CRM_1551_Analitics].[dbo].[Streets]
	  SET [is_active]='false'
	  FROM [CRM_1551_Analitics].[dbo].[Streets] ans
	  WHERE ans.Id=@Analitics_Id--urbio_id IN (select value from #Ids)

	  UPDATE [CRM_1551_URBIO_Integrartion].[dbo].[streets]
	  SET is_done='true'
	  , done_date=getutcdate()
	  , [comment]=@comment
	  , [user_id]=@user_id
	  WHERE Id=@Urbio_Id --in (select value from #Ids)

  END
  
  IF @Operation=N'Додавання'
  BEGIN
		INSERT INTO [CRM_1551_Analitics].[dbo].[Streets]
	  (
	  [district_id]
		  ,[street_type_id]
		  ,[name]
		  ,[street_name_new_id]
		  ,[urbio_id]
		  ,[is_active]
		  ,[is_urbio_new]
	  )
	  
	  select d.Id [district_id] --в довідники Analitics.Districts  додати поле urbio_id?
		  ,ut.Id --в довідник  Analitics.Street_types додати name_shortToponym?
		  ,ISNULL(name_fullName+N' ', N'')+ISNULL(uniqueMarker_fullText+N' ',N'')+
		   ISNULL(history_fullName+N' ', N'')+ISNULL(history_shortToponym+N' ',N'') [name]
		  ,null [street_name_new_id]
		  ,s.Id [urbio_id]
		  ,'true' [is_active]
		  ,'true' [is_urbio_new]
	  FROM [CRM_1551_URBIO_Integrartion].[dbo].[streets] s
	  left join [CRM_1551_Analitics].[dbo].[Districts] d ON s.ofDistrict_id=d.urbio_id
	  LEFT JOIN [CRM_1551_Analitics].[dbo].[EventTypes_UrbioTypes] ut on s.TypeId_1551=ut.urbio_type_id
	  where s.Id=@Urbio_Id 
	  --inner join #Ids i ON [streets].Id=i.value

	  UPDATE [CRM_1551_URBIO_Integrartion].[dbo].[streets]
	  SET is_done='true'
	  , done_date=getutcdate()
	  , [comment]=@comment
	  , [user_id]=@user_id
	  WHERE Id=@Urbio_Id--Id in (select value from #Ids)	

  END

  IF @Operation=N'Редагування'
  BEGIN
			UPDATE [CRM_1551_Analitics].[dbo].[Streets]
	  SET [district_id]=d.Id
		  ,[street_type_id]=us.Id
		  ,[name]=ISNULL(us.name_fullName+N' ', N'')+ISNULL(us.uniqueMarker_fullText+N' ',N'')+
			ISNULL(us.history_fullName+N' ', N'')+ISNULL(us.history_shortToponym+N' ',N'')
		  --,[street_name_new_id]
		  --,[urbio_id]
		  ,[is_active]='true'
		  --,[is_urbio_new]
	  FROM [CRM_1551_Analitics].[dbo].[Streets] ans
	  INNER JOIN [CRM_1551_URBIO_Integrartion].[dbo].[streets] us ON ans.urbio_id=us.Id
	  left join [CRM_1551_Analitics].[dbo].[Districts] d ON us.ofDistrict_id=d.urbio_id
	  LEFT JOIN [CRM_1551_Analitics].[dbo].[EventTypes_UrbioTypes] ut on us.TypeId_1551=ut.urbio_type_id
	  WHERE ans.Id=@Analitics_Id;--urbio_id IN (select value from #Ids)

	   UPDATE [CRM_1551_URBIO_Integrartion].[dbo].[streets]
	  SET is_done='true'
	  , done_date=getutcdate()
	  , [comment]=@comment
	  , [user_id]=@user_id
	  WHERE Id=@Urbio_Id --in (select value from #Ids)

  END

  DECLARE @table NVARCHAR(200)= N'streets'; 
  --declare @user_id nvarchar(123)=N'Вася';
  --DECLARE @urbio_id NVARCHAR(128)=@Urbio_Id;
  --declare @id_1551 int=13;
  --declare @comment nvarchar(123)=N'sdgss';
  --declare @operation_code nvarchar(23)=N'add'
  DECLARE @operation_code NVARCHAR(50)=CASE 
      WHEN @Operation=N'Додавання' THEN N'add'
      WHEN @Operation=N'Редагування' THEN N'change'
      WHEN @Operation=N'Видалення' THEN N'del'
      END;

EXEC add_Urbio_Objects_History @table, @user_id, @Urbio_Id, @Analitics_Id, @comment, @operation_code;