/*
declare @AssignmentResultsId int = 5, @question_id int = 6689187, @UserId nvarchar(128) = N'Admin', @Question_Prew_Rating int = 1
,@Question_Prew_Comment nvarchar(100) = N'Test'
*/

-----------------------------
	DECLARE @assignment_id INT = (SELECT TOP 1  [last_assignment_for_execution_id] FROM [dbo].[Questions] WHERE Id = @question_id);
	DECLARE @assignmentConsideration_id INT = (SELECT TOP 1 current_assignment_consideration_id FROM dbo.Assignments WHERE Id = @assignment_id);
	DECLARE @assignmentRevision_id INT = (SELECT TOP 1  Id FROM dbo.AssignmentRevisions WHERE assignment_consideration_іd = @assignmentConsideration_id);
	DECLARE @first_executor_organization_id NVARCHAR(100) = (SELECT TOP 1  executor_organization_id FROM dbo.Assignments WHERE Id = @assignment_id);

DECLARE @NEW_AssignmentStateId INT,
		@NEW_AssignmentResultsId INT,
		@NEW_AssignmentResolutionId INT;


IF @AssignmentResultsId = 5	/*На доопрацювання*/
BEGIN
	SELECT TOP 1 @NEW_AssignmentStateId = tas.new_assignment_state_id,
	@NEW_AssignmentResultsId = tas.new_assignment_result_id,
	@NEW_AssignmentResolutionId = tas.new_assignment_resolution_id
	FROM [dbo].[Questions] q
	INNER JOIN [dbo].[Assignments] a ON a.Id = q.last_assignment_for_execution_id
	INNER JOIN [dbo].[AssignmentConsiderations] ac ON ac.Id =  a.[current_assignment_consideration_id]
	INNER JOIN [dbo].[AssignmentRevisions] ar ON ar.assignment_consideration_іd =  ac.[Id]
	LEFT JOIN [dbo].[TransitionAssignmentStates] tas ON ISNULL(tas.old_assignment_result_id,0) = ISNULL(a.AssignmentResultsId,0) 
		AND  ISNULL(tas.old_assignment_resolution_id,0) = ISNULL(a.AssignmentResolutionsId,0) 
		AND ISNULL(tas.old_assignment_state_id,0) = ISNULL(a.assignment_state_id,0)
	    AND ISNULL(tas.new_assignment_result_id,0) = CASE WHEN ISNULL(ar.rework_counter,0)<=2 THEN 5 /*На доопрацювання*/ WHEN ISNULL([AssignmentRevisions].rework_counter,0)>2 THEN 12 /*Фактично*/ END
	WHERE q.[Id] = @question_id AND q.[question_state_id] = 3	/*На перевірці*/ 
	AND a.[AssignmentResultsId] IN (SELECT [Id] FROM [dbo].[AssignmentResults] ass WHERE code IN ( N'WasExplained', N'Done', N'ItIsNotPossibleToPerformThisPeriod')); /*Роз"яснено, Виконано, Не можливо виконати в данний період.*/
	
	--select @NEW_AssignmentStateId, @NEW_AssignmentResultsId, @NEW_AssignmentResolutionId
	UPDATE [dbo].[Assignments] SET 
	    		 [AssignmentResultsId] = @NEW_AssignmentResultsId
	    		,[AssignmentResolutionsId] = @NEW_AssignmentResolutionId
	    		,[assignment_state_id] = @NEW_AssignmentStateId
	    		,[state_change_date] = GETUTCDATE()
	    		,[edit_date] = GETUTCDATE()
	    		,[user_edit_id] = @UserId
				,LogUpdated_Query = N'CloseAssignments_UpdateRow42'
	WHERE Id = @assignment_id;
	
	UPDATE dbo.AssignmentRevisions SET
			 [assignment_resolution_id] = @NEW_AssignmentResolutionId
			,[rework_counter] = isnull([rework_counter],0)+1
			,[control_result_id] = NULL
			,[control_date] = GETUTCDATE()
			,[grade] = @Question_Prew_Rating
			,[grade_comment] = @Question_Prew_Comment
			,[edit_date] = GETUTCDATE()
			,[user_edit_id] = @UserId
	WHERE id = @assignmentRevision_id;

	 DECLARE @output_con TABLE (Id INT);
	 INSERT INTO [dbo].[AssignmentConsiderations] ([assignment_id]
												  ,[consideration_date]
												  ,[assignment_result_id]
												  ,[assignment_resolution_id]
												  ,[first_executor_organization_id]
												  ,[transfer_to_organization_id]
												  ,[turn_organization_id]
												  ,[short_answer]
												  ,[user_id]
												  ,[edit_date]
												  ,[user_edit_id]
												  ,[counter]
												  ,[create_date]
												  ,[transfer_date])
	OUTPUT inserted.Id INTO @output_con([Id])
	SELECT @assignment_id [assignment_id],
		   GETUTCDATE() [consideration_date],
		   @NEW_AssignmentResultsId [assignment_result_id],
		   @NEW_AssignmentResolutionId [assignment_resolution_id],
		   @first_executor_organization_id [first_executor_organization_id],
		   NULL [transfer_to_organization_id],
		   NULL [turn_organization_id],
		   NULL [short_answer],
		   @UserId [user_id],
		   GETUTCDATE() [edit_date],
		   @UserId [user_edit_id],
		   NULL [counter],
		   GETUTCDATE() [create_date],
		   NULL [transfer_date];
		
		DECLARE @new_con INT = (SELECT TOP (1) Id FROM @output_con);

		UPDATE [dbo].[Assignments] 
		SET current_assignment_consideration_id = @new_con
			,[edit_date]=GETUTCDATE()
		WHERE Id = @assignment_id;
END

IF @AssignmentResultsId = 14	/*Відмінено*/
BEGIN
	

	SELECT TOP 1 @NEW_AssignmentStateId = [tas].new_assignment_state_id,
	@NEW_AssignmentResultsId = [tas].new_assignment_result_id,
	@NEW_AssignmentResolutionId = [tas].new_assignment_resolution_id
	FROM [dbo].[Questions] q
	LEFT JOIN [dbo].[Assignments] a ON [a].Id = [q].last_assignment_for_execution_id
	LEFT JOIN [dbo].[AssignmentConsiderations] ac ON [ac].Id =  [a].[current_assignment_consideration_id]
	LEFT JOIN [dbo].[AssignmentRevisions] ar ON [ar].assignment_consideration_іd =  [ac].[Id]
	LEFT JOIN [dbo].[TransitionAssignmentStates] tas ON 
		ISNULL([tas].new_assignment_result_id ,0) = 14
		AND ISNULL([tas].old_assignment_state_id,0) = ISNULL(Assignments.assignment_state_id,0)
	WHERE [Questions].[Id] = @question_id;

	
	--select @NEW_AssignmentStateId, @NEW_AssignmentResultsId, @NEW_AssignmentResolutionId
	UPDATE [dbo].[Assignments] SET 
	    		 [AssignmentResultsId] = @NEW_AssignmentResultsId
	    		,[AssignmentResolutionsId] = @NEW_AssignmentResolutionId
	    		,[assignment_state_id] = @NEW_AssignmentStateId
	    		,[state_change_date] = GETUTCDATE()
	    		,[edit_date] = GETUTCDATE()
	    		,[user_edit_id] = @UserId
				,LogUpdated_Query = N'CloseAssignments_UpdateRow122'
	WHERE Id = @assignment_id;
	
	UPDATE dbo.AssignmentRevisions SET
	    			 [assignment_resolution_id] = @NEW_AssignmentResolutionId
					 ,[rework_counter] = isnull([rework_counter],0)+1
	    			,[control_result_id] = NULL
					,[control_date] = GETUTCDATE()
	    			,[grade] = @Question_Prew_Rating
	    			,[grade_comment] = @Question_Prew_Comment
	    			,[edit_date] = GETUTCDATE()
	    			,[user_edit_id] = @UserId
	WHERE id = @assignmentRevision_id;
END
ELSE
BEGIN
	DECLARE @AssignmentResultsCode NVARCHAR(100) = (SELECT TOP 1 code FROM [dbo].[AssignmentResults] WHERE id = @AssignmentResultsId);
	DECLARE @AssignmentResolutionsCode NVARCHAR(100);
	DECLARE @AssignmentResolutionsId INT;
	
	DECLARE @AssignmentTypesToAttentionId INT = (SELECT TOP 1 [Id]  FROM [dbo].[AssignmentTypes] WHERE code = N'ToAttention' /*До відома*/);
	DECLARE @AssignmentResultsToAttentionId INT = (SELECT TOP 1 id FROM [dbo].[AssignmentResults] WHERE code =  N'AcceptedToAttention' /*Прийнято до відома*/);
	DECLARE @AssignmentResolutionsToAttentionId INT = (SELECT TOP 1 [Id]  FROM [dbo].[AssignmentTypes] WHERE code = N'GotToKnow' /*Ознайомився*/);

	IF @AssignmentResultsCode = N'Done' /*Виконано*/
	BEGIN
		SET @AssignmentResolutionsId = (SELECT TOP 1 id FROM [dbo].[AssignmentResolutions] WHERE code =  N'ApprovedByTheApplicant' /*Підтверджено заявником*/);
		SET @AssignmentResolutionsCode = (SELECT TOP 1 @ code FROM [dbo].[AssignmentResolutions] WHERE code =  N'ApprovedByTheApplicant' /*Підтверджено заявником*/);
	END

	IF @AssignmentResultsCode = N'Independently' /*Самостійно*/
	BEGIN
	 	SET @AssignmentResolutionsId = (SELECT TOP 1 id FROM [dbo].[AssignmentResolutions] WHERE code =  N'TheApplicantHasSolvedTheProblemOnHisOwn' /*Заявник усунув проблему власними силами*/);
		SET @AssignmentResolutionsCode = (SELECT TOP 1 code FROM [dbo].[AssignmentResolutions] WHERE code =  N'TheApplicantHasSolvedTheProblemOnHisOwn' /*Заявник усунув проблему власними силами*/);
	END 
	
	
	declare @output table (Id int)
	
	if (select question_state_id FROM Questions WHERE Id = @question_id) = 
	    (SELECT TOP 1 Id FROM [dbo].[QuestionStates] WHERE code =  N'Closed' /*Закрито*/)
	    begin
	        return
	    end
	    else
	    begin
	
	    	update [dbo].[Questions] set 
	    		[question_state_id] = (SELECT TOP 1 Id FROM [dbo].[QuestionStates] WHERE code =  N'Closed' /*Закрито*/),
	    		[edit_date]= GETUTCDATE(),
	    		[user_edit_id] = @UserId
	    	WHERE [Id] = @question_id
	    
	    	update [dbo].[Assignments] set 
	    		 [AssignmentResultsId] = case when [assignment_type_id] = @AssignmentTypesToAttentionId then @AssignmentResultsToAttentionId else @AssignmentResultsId end
	    		,[AssignmentResolutionsId] = case when [assignment_type_id] = @AssignmentTypesToAttentionId then @AssignmentResultsToAttentionId else @AssignmentResolutionsId end 
	    		,[assignment_state_id] = (SELECT TOP 1 Id FROM [dbo].[AssignmentStates] WHERE code =  N'Closed' /*Закрито*/)
	    		,[close_date] = GETUTCDATE()
	    		,[edit_date] = GETUTCDATE()
	    		,[user_edit_id] = @UserId
				,LogUpdated_Query = N'CloseAssignments_UpdateRow141'
	    	WHERE Id = @assignment_id
	    
	    	update [dbo].[AssignmentConsiderations] set  
	    		[assignment_result_id] = case when [assignment_type_id] = @AssignmentTypesToAttentionId then @AssignmentResultsToAttentionId else @AssignmentResultsId end
	    		,[assignment_resolution_id] = case when [assignment_type_id] = @AssignmentTypesToAttentionId then @AssignmentResultsToAttentionId else @AssignmentResolutionsId end
	    		,[edit_date] = getutcdate()
	    		,[user_edit_id] = @UserId
	    	FROM [dbo].[AssignmentConsiderations]
	    	left join [dbo].[Assignments] on [AssignmentConsiderations].Id = [Assignments].current_assignment_consideration_id
	    	WHERE [AssignmentConsiderations].Id = @assignmentConsideration_id									 
	    	
	    	-- если нет ревижина то insert, если есть то update
	    	if (select count(*) FROM [AssignmentRevisions] WHERE assignment_consideration_іd = @assignmentConsideration_id) = 0
	    	begin --(insert revision)
	    		insert into [dbo].[AssignmentRevisions] 
	    			([assignment_consideration_іd]
	    			,[control_type_id]
	    			,[assignment_resolution_id]
	    			,[control_result_id]
	    			,[organization_id]
	    			,[control_comment]
	    			,[control_date]
	    			,[user_id]
	    			,[grade]
	    			,[grade_comment]
	    			,[rework_counter]
	    			,[edit_date]
	    			,[user_edit_id])
	    		select 
	    			   [AssignmentConsiderations].Id as [assignment_consideration_іd],
	    			   1 as [control_type_id], /*Контроль*/
	    			   case when [Assignments].[assignment_type_id] = @AssignmentTypesToAttentionId then @AssignmentResultsToAttentionId else @AssignmentResolutionsId end as [assignment_resolution_id],
	    			   NULL as [control_result_id],
	    			   NULL as [organization_id],
	    			   NULL as [control_comment],
	    			   NULL as [control_date],
	    			   @UserId as [user_id],
	    			   @Question_Prew_Rating as [grade],
	    			   @Question_Prew_Comment as [grade_comment],
	    			   0 as [rework_counter],
	    			   getutcdate() as [edit_date],
	    			   @UserId as [user_edit_id]
	    		FROM [dbo].[AssignmentConsiderations]
	    		left join [dbo].[Assignments] on [AssignmentConsiderations].assignment_id = [Assignments].Id
	    		WHERE [AssignmentConsiderations].Id = @assignmentConsideration_id
	    	end --(insert revision)
	    	else
	    	begin --(update revision)
	    		update dbo.AssignmentRevisions set
	    			 [assignment_resolution_id] = @AssignmentResolutionsId
	    			,[control_result_id] = null
					,control_date  = null
	    			,[grade] = @Question_Prew_Rating
	    			,[grade_comment] = @Question_Prew_Comment
	    			,[edit_date] = GETUTCDATE()
	    			,[user_edit_id] = @UserId
	    		WHERE id = @assignmentRevision_id
	    		
	    	end --(update revision)
	    end
end

select 'OK' as TextRes
