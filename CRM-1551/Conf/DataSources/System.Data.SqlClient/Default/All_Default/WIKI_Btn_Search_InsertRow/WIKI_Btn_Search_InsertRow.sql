INSERT INTO
	[dbo].[Consultations] (
		[registration_date],
		[phone_number],
		[appeal_id],
		[consultation_type_id],
		[object_id],
		[user_id]
	)
VALUES
	(
		getutcdate(),
		@Applicant_Phone,
		@AppealId,
		3,
		/*За Базою Знань (БЗ)*/
		@Applicant_Building,
		@CreatedUser
	) 
IF(@applicant_id IS NOT NULL) 
BEGIN 
----- add Artem
UPDATE
	[CRM_1551_Analitics].[dbo].[Appeals]
SET
	applicant_id = @applicant_id
WHERE
	id = @AppealId;

END