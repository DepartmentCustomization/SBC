SELECT
	[Orders].[Id],
	Orders.Claim_ID AS claims_number,
CASE
		WHEN len(claims.Id) = 0 
		THEN NULL
		ELSE claims.Id
	END AS claims_id,
	Shifts.Name AS shifts_name,
	Shifts.Id AS shifts_Id,
	[Status].Name AS status_name,
	[Status].Id AS status_id,
	[Orders].[Created_at],
	[Orders].[Pushed_at],
	[Orders].[Start_at],
	[Orders].[Plan_duration],
	[Orders].[Finished_at],
	[Orders].[Closed_at],
	Orders.Finish_at_actions,
	Organizations.Short_name AS organizations_name,
	Organizations.Id AS organizations_id,
	st.Name AS claim_status_name,
	st.Id AS claim_status_id,
	Claims.Status_ID AS claim_stat_id,
	Claim_classes.Name AS claim_classes_name,
	Claim_classes.Id AS claim_classes_id,
	Organizations.Id AS org_id,
	Places.Id AS places_id,
	Places.Name AS places_name,
	Houses.Street_id,
	Orders.Comment_result,
CASE
		WHEN User_id = '29796543-b903-48a6-9399-4840f6eac396' THEN N'Адміністратор'
		ELSE con.Name
	END AS user_name,
	j.Job_name AS position,
CASE
		WHEN Orders.user_edit = '29796543-b903-48a6-9399-4840f6eac396' THEN N'Адміністратор'
		ELSE con_close.Name
	END AS user_edit,
	j_close.Job_name AS position_close
FROM
	[dbo].[Orders] Orders
	LEFT JOIN [dbo].[Claims] Claims ON Claims.Id = Orders.Claim_ID
	LEFT JOIN [dbo].[Shifts] Shifts ON Shifts.Id = Orders.Shift_ID
	LEFT JOIN [dbo].[Status] [Status] ON [Status].Id = Orders.Status_ID
	LEFT JOIN [dbo].[Status] st ON st.Id = Claims.Status_ID
	LEFT JOIN [dbo].[Claim_classes] Claim_classes ON Claim_classes.Id = Claims.Claim_class_ID
	LEFT JOIN [dbo].[Organizations] Organizations ON Organizations.Id = Claims.Response_organization_ID
	LEFT JOIN [dbo].[Claim_Order_Places] Claim_Order_Places ON Claim_Order_Places.Orders_ID = Orders.Id
	LEFT JOIN [dbo].[Places] Places ON Places.Id = Claim_Order_Places.Place_ID
	LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Places.Street_id
	LEFT JOIN [dbo].[Jobs] AS j ON j.[Login] = Orders.[User_id]
	LEFT JOIN [dbo].[Jobs] AS j_close ON j_close.[Login] = Orders.[user_edit]
	LEFT JOIN [dbo].[Contacts] AS con ON con.Id = j.Contacts_ID
	LEFT JOIN [dbo].[Contacts] AS con_close ON con_close.Id = j_close.Contacts_ID
WHERE
	Orders.Id = @Id;