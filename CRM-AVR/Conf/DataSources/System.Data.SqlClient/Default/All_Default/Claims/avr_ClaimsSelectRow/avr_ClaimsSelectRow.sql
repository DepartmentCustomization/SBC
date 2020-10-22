-- DECLARE @Id INT = 269;

SELECT
	[Claims].[Id],
	ct.Id AS FIZ_concact_id,
	ct.Name AS FIZ_contact_fio,
(
		SELECT
			TOP(1) [Number]
		FROM
			dbo.Contact_phones cp 
		WHERE
			cp.Contact_ID = ct.Id
	) AS FIZ_number,
	CASE WHEN UR_org.Id IS NULL THEN 
	isnull(ct.Contact_type_ID, ct2.Contact_type_ID) 
	ELSE 2 END
	AS contact_type,
	ct.Id AS EM_contact_fio,
	ct.Name AS EM_contact_fio_name,
	isnull(Jobs.Organization_ID, ct2.Id) AS EM_org_id,
(
		SELECT
			org.Name
		FROM
			dbo.Organizations org
		WHERE
			Jobs.Organization_ID = org.Id
	) AS EM_org_name,
(
		SELECT
			TOP(1) [Number]
		FROM
			dbo.Contact_phones cp
 		WHERE
			cp.Contact_ID = ct.Id
	) AS EM_number,
	UR_org.Id AS UR_organization_id,
	UR_org.Name AS UR_organization_name,
	Claim_content.UR_organization AS UR_organization,
	Claim_content.G_PIB AS UR_contact_fio,
	Claim_content.Phone AS UR_number,
	UR_phone.Number AS UR_number_phone,
CASE
		WHEN isnull(Jobs.Organization_ID, ct2.Id) BETWEEN 5000
		AND 5999 THEN 5
		WHEN isnull(Jobs.Organization_ID, ct2.Id) BETWEEN 6000
		AND 6999 THEN 6
		WHEN isnull(Jobs.Organization_ID, ct2.Id) BETWEEN 8000
		AND 8999 THEN 8
		WHEN isnull(Jobs.Organization_ID, ct2.Id) BETWEEN 15000
		AND 15999 THEN 15
		ELSE isnull(Jobs.Organization_ID, ct2.Id)
	END AS type_employee_2,
	IIF(len(reg_h.fio) > 1, reg_h.fio, reg_h.sys_fio) AS [User],
	IIF(len(reg_h.pos) > 1, reg_h.pos, reg_h.sys_pos) AS position_reg,
	[Claims].[Id] AS claims_id,
	[Claims].[Claim_Number],
	[Claim_classes].[Name] AS classes_name,
	[Claim_classes].[Id] AS classes_id,
	[Status].[Name] AS status_name,
	[Status].[Id] AS status_id,
	[first_type].[Name] AS first_types_name,
	[first_type].[Id] AS first_types_id,
	[Claim_types].[Full_Name] AS types_name,
	[Claim_types].[Id] AS types_id,
	[Claims].[Created_at],
	[Organizations].[Name] AS organization_name,
	[Organizations].[Id] AS organization_id,
	[Claims].[Plan_start_date],
	[Claims].[Plan_finish_at],
	[Claims].[First_description],
	[Claims].[Description],
	[Claims].[Priority],
	[Claims].[Report_action_id],
	Claims.Fact_finish_at,
	Places.Name AS places_name,
	Places.Id AS places_id,
	Place_types.Name AS place_type_name,
	Place_types.Id AS place_type_id,
	Diameters.Size,
	Diameters.Id AS Diameters_ID,
	isnull(
		(
			SELECT
				count(Id)
			FROM
				dbo.Orders
			WHERE
				Orders.Claim_ID = @Id
		),
		0
	) AS count_orders,
	Claims.Is_Template,
	Flats.Id AS flat_id,
	Flats.[Number] AS flat_number,
	Districts.Name AS district_name,
	Districts.Id AS district_id,
	Jobs.Job_name,
	NULL AS is_Zasuv,
	-- Если заявка закрыта, + по UserId есть данные в Jobs / Contacts то берутся они, иначе системные
	IIF(Claims.Status_ID <> 5, NULL, 
		IIF(len(close_h.fio) > 1, close_h.fio, close_h.sys_fio)
		 ) AS user_close,
	IIF(Claims.Status_ID <> 5, NULL,
		IIF(len(close_h.pos) > 1, close_h.pos, close_h.sys_pos)
		) AS position_close,
	IIF(Claims.Status_ID <> 5, NULL,(
		SELECT
			TOP 1 Claims_History.[Date]
		FROM
			dbo.Claims 
			LEFT JOIN dbo.Claims_History ON Claims_History.Claims_ID = Claims.Id
		WHERE
			Claims.id = @Id
		ORDER BY
			Claims_History.Id DESC
	) ) AS date_close,
	Houses.Street_id,
	Claims.date_check,
	Claims.not_balans,
	Claim_content.Sked,
	Claim_content.[TU],
	Claim_content.[TU_Id],
	Claim_content.[Letter],
	Claim_content.[L_Contacts_Id],
	Claim_content.[Gravamen],
	Claim_content.[G_Left],
	Claim_content.[G_PIB],
	ct3.Name AS x_pib_inspector_name,
	ct3.Id AS x_pib_inspector,
(
		SELECT
			TOP(1) [Number]
		FROM
			dbo.Contact_phones
		WHERE
			Contact_ID = ct3.Id
	) AS x_phone_inspector,
	Claim_classes.PriorityType
FROM
	[dbo].[Claims] [Claims] 
	LEFT JOIN [dbo].[Status] [Status] ON [Status].[Id] = [Claims].[Status_ID]
	LEFT JOIN [dbo].[Claim_classes] [Claim_classes] ON [Claim_classes].[Id] = [Claims].[Claim_class_ID]
	LEFT JOIN [dbo].[Claim_types] [Claim_types] ON [Claim_types].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Claim_types] AS first_type ON [first_type].[Id] = [Claims].[Claim_type_ID] 
	LEFT JOIN [dbo].[Organizations] [Organizations] ON [Organizations].[Id] = [Claims].[Response_organization_ID]
	LEFT JOIN dbo.Claim_Order_Places Claim_Order_Places ON Claim_Order_Places.Claim_ID = Claims.Id 
	LEFT JOIN dbo.Flats Flats ON Flats.Id = Claim_Order_Places.Flats_ID
	LEFT JOIN dbo.Places Places ON Places.Id = Claim_Order_Places.Place_ID
	LEFT JOIN dbo.Houses Houses ON Houses.Id = Places.Street_id
	LEFT JOIN dbo.Contacts AS ct ON ct.Id = Claims.Contact_ID
	LEFT JOIN dbo.Contacts AS ct2 ON ct2.Id = Claims.Contact_ID_Fiz
	LEFT JOIN dbo.Contact_types Contact_types ON Contact_types.Id = ct.Contact_type_ID
	LEFT JOIN dbo.Contact_types AS Contact_types2 ON Contact_types2.Id = ct2.Contact_type_ID
	LEFT JOIN dbo.Jobs Jobs ON Jobs.Contacts_ID = ct.Id
	LEFT JOIN dbo.Organizations org_jobs ON org_jobs.Id = jobs.Organization_ID
	LEFT JOIN dbo.Organizations UR_org ON UR_org.Id = [Claims].UR_organization_ID
	LEFT JOIN dbo.Contact_phones UR_phone ON UR_phone.Contact_ID = ct2.Id
	LEFT JOIN dbo.Diameters Diameters ON Diameters.Id = Claims.Diameters_ID
	LEFT JOIN dbo.Place_types Place_types ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN dbo.Districts Districts ON Districts.Id = Places.District_ID
	LEFT JOIN dbo.Claim_content Claim_content ON Claim_content.Claim_Id = Claims.Id
	LEFT JOIN dbo.Contacts AS ct3 ON ct3.Id = Claim_content.Contact_insp_PIB
	-- Создавший заявку
	LEFT JOIN (SELECT TOP 1 
					ISNULL(c.[Surname],SPACE(0)) + SPACE(1) + ISNULL(c.First_name,SPACE(0)) AS fio,
					p.[Name] AS pos,
					ISNULL(sys_u.[LastName], SPACE(0)) + SPACE(1) + ISNULL(sys_u.[FirstName], SPACE(0)) AS sys_fio,
					sys_up.JobTitle AS sys_pos
			   FROM dbo.Claims_History ch
			   LEFT JOIN dbo.Jobs j ON ch.[User] = j.[Login]
			   LEFT JOIN dbo.Contacts c ON j.Contacts_ID = c.Id
			   LEFT JOIN dbo.Positions p ON j.Position_ID = p.Id
			   LEFT JOIN [#system_database_name#].dbo.[User] sys_u ON sys_u.[UserId] = ch.[User]
			   LEFT JOIN [#system_database_name#].dbo.[UserInOrganisation] sys_up ON sys_up.UserId = sys_u.[UserId]
				AND sys_up.JobTitle IS NOT NULL
			   WHERE ch.Claims_ID = @Id
			   ORDER BY ch.Id ASC ) AS reg_h ON 1=1
	-- Закрытший заяву
	LEFT JOIN (SELECT TOP 1 
					ISNULL(c.[Surname],SPACE(0)) + SPACE(1) + ISNULL(c.First_name,SPACE(0)) AS fio,
					p.[Name] AS pos,
					ISNULL(sys_u.[LastName],SPACE(0)) + SPACE(1) + ISNULL(sys_u.[FirstName],SPACE(0)) AS sys_fio,
					sys_up.JobTitle AS sys_pos
			   FROM dbo.Claims_History ch
			   LEFT JOIN dbo.Jobs j ON ch.[User] = j.[Login]
			   LEFT JOIN dbo.Contacts c ON j.Contacts_ID = c.Id
			   LEFT JOIN dbo.Positions p ON j.Position_ID = p.Id
			   LEFT JOIN [#system_database_name#].dbo.[User] sys_u ON sys_u.[UserId] = ch.[User]
			   LEFT JOIN [#system_database_name#].dbo.[UserInOrganisation] sys_up ON sys_up.UserId = sys_u.[UserId]
			   -- CRM_AVR_System
				AND sys_up.JobTitle IS NOT NULL
			   WHERE ch.Claims_ID = @Id
			   ORDER BY ch.Id DESC ) AS close_h ON 1=1
WHERE
	[Claims].[Id] = @Id
	AND Claim_Order_Places.Is_first_place <> 0 ;