
DECLARE @output_pacient TABLE (Id INT);
DECLARE @output_applicant TABLE (Id INT);
DECLARE @output_event TABLE (Id INT);

INSERT INTO [dbo].[Persons]
  (
  [last_name]
      ,[first_name]
      ,[middle_name]
      ,[person_phone]
      ,[sex]
      ,[birth_date]
      ,[building_id]
      ,[entrance]
      ,[entercode]
      ,[storeysnumber]
      ,[floor]
      ,[flat]
      ,[exit]
      ,[moreinformation]
      ,[longitude]
      ,[latitude]
      ,[user_id]
      ,[create_date]
      ,[user_edit_id]
      ,[edit_date]
  )

  OUTPUT [inserted].[Id] INTO @output_applicant (Id)

  SELECT @applicant_last_name [last_name]
      ,@applicant_first_name [first_name]
      ,@applicant_middle_name [middle_name]
      ,@applicant_person_phone [person_phone]
      ,@applicant_sex [sex]
      ,@applicant_birth_date [birth_date]
      ,@applicant_building_id [building_id]
      ,@applicant_entrance [entrance]
      ,@applicant_entercode [entercode]
      ,@applicant_storeysnumber [storeysnumber]
      ,@applicant_floor [floor]
      ,@applicant_flat [flat]
      ,@applicant_exit [exit]
      ,@applicant_moreinformation [moreinformation]
      ,@applicant_longitude [longitude]
      ,@applicant_latitude [latitude]
      ,@user_id [user_id]
      ,GETUTCDATE() [create_date]
      ,@user_id [user_edit_id]
      ,GETUTCDATE() [edit_date];


	  INSERT INTO [dbo].[Persons]
  (
  [last_name]
      ,[first_name]
      ,[middle_name]
      ,[person_phone]
      ,[sex]
      ,[birth_date]
      ,[building_id]
      ,[entrance]
      ,[entercode]
      ,[storeysnumber]
      ,[floor]
      ,[flat]
      ,[exit]
      ,[moreinformation]
      ,[longitude]
      ,[latitude]
      ,[user_id]
      ,[create_date]
      ,[user_edit_id]
      ,[edit_date]
  )

  OUTPUT [inserted].[Id] INTO @output_pacient (Id)

  SELECT @pacient_last_name [last_name]
      ,@pacient_first_name [first_name]
      ,@pacient_middle_name [middle_name]
      ,@pacient_person_phone [person_phone]
      ,@pacient_sex [sex]
      ,@pacient_birth_date [birth_date]
      ,@pacient_building_id [building_id]
      ,@pacient_entrance [entrance]
      ,@pacient_entercode [entercode]
      ,@pacient_storeysnumber [storeysnumber]
      ,@pacient_floor [floor]
      ,@pacient_flat [flat]
      ,@pacient_exit [exit]
      ,@pacient_moreinformation [moreinformation]
      ,@pacient_longitude [longitude]
      ,@pacient_latitude [latitude]
      ,@user_id [user_id]
      ,GETUTCDATE() [create_date]
      ,@user_id [user_edit_id]
      ,GETUTCDATE() [edit_date];


	  ----------табличка события

	  INSERT INTO [dbo].[Events]
  (
  [receipt_date]
      ,[work_line_id]
      ,[work_line_value]
      ,[category_id]
      ,[event_date]
      ,[applicant_id]
      ,[patient_id]
      ,[applicant_type_id]
      ,[building_id]
      ,[entrance]
      ,[entercode]
      ,[storeysnumber]
      ,[floor]
      ,[flat/office]
      ,[exit]
      ,[moreinformation]
      ,[longitude]
      ,[latitude]
      ,[content]
      ,[sipcallid]
      ,[user_id]
      ,[edit_date]
      ,[user_edit_id]
  )

  OUTPUT [inserted].[Id] INTO @output_event (Id)

  SELECT @event_receipt_date [receipt_date]
      ,@event_work_line_id [work_line_id]
      ,@event_work_line_value [work_line_value]
      ,@event_category_id [category_id]
      ,@event_event_date [event_date]
      ,(SELECT TOP 1 Id FROM @output_applicant) [applicant_id]
      ,(SELECT TOP 1 Id FROM @output_pacient) [patient_id]
      ,@event_applicant_type_id [applicant_type_id]
      ,@event_building_id [building_id]
      ,@event_entrance [entrance]
      ,@event_entercode [entercode]
      ,@event_storeysnumber [storeysnumber]
      ,@event_floor [floor]
      ,@event_flat_office [flat/office]
      ,@event_exit [exit]
      ,@event_moreinformation [moreinformation]
      ,@event_longitude [longitude]
      ,@event_latitude [latitude]
      ,@event_content [content]
      ,@event_sipcallid [sipcallid]
      ,@user_id [user_id]
      ,GETUTCDATE() [edit_date]
      ,@user_id [user_edit_id];



	DECLARE @Services_EX NVARCHAR(MAX)=

  N'SELECT '+(SELECT TOP 1 LTRIM(id) FROM @output_event)+N' event_id, 
  s.id, N'''+@user_id+N''', GETUTCDATE() [edit_date]
  FROM [dbo].[Services] s
  WHERE s.id IN ('+ISNULL(@service_ids, N'0')+N')';



	  INSERT INTO [dbo].[EventExecutors]
  (
  [event_id]
  ,[service_id]
  ,[user_id]
  ,[create_date]
  )

  EXEC(@Services_EX);


  --- заполнение [PersonClasses]
  DECLARE @PersonClasses_EX NVARCHAR(max)=
  N'
  SELECT 
	   '+(SELECT TOP 1 LTRIM(id) FROM @output_applicant)+N' [person_id]
      ,id [class_id]
      ,N'''+@user_id+N''' [user_id]
      ,GETUTCDATE() [create_date]
      ,N'''+@user_id+N''' [user_edit_id]
      ,GETUTCDATE() [edit_date]
  FROM [dbo].[Classes]
  WHERE id IN ('+ISNULL(@applicant_classes_ids,N'0')+N')
  
  UNION 

  SELECT 
	   '+(SELECT TOP 1 LTRIM(id) FROM @output_pacient)+N' [person_id]
      ,id [class_id]
      ,N'''+@user_id+N''' [user_id]
      ,GETUTCDATE() [create_date]
      ,N'''+@user_id+N''' [user_edit_id]
      ,GETUTCDATE() [edit_date]
  FROM [dbo].[Classes]
  WHERE id IN ('+ISNULL(@pacient_classes_ids,N'0')+N')';

  INSERT INTO [dbo].[PersonClasses]
  (
  [person_id]
      ,[class_id]
      ,[user_id]
      ,[create_date]
      ,[user_edit_id]
      ,[edit_date]
  )
  
  EXEC(@PersonClasses_EX);
  
