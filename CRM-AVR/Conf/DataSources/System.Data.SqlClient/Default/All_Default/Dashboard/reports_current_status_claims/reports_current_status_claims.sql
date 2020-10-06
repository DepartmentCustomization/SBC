--  DECLARE @date_from DATETIME = '2020-01-01 00:00:00';
--  DECLARE @date_to DATETIME = getdate();

SELECT
	Claims.Id,
	org.Short_name AS org_name,
	concat(
		CONVERT(
			VARCHAR(10),
			CAST(Claims.Created_at AS DATE),
			104
		),
		' ',
		CONVERT(VARCHAR(5), CAST(Claims.Created_at AS TIME), 108)
	) AS Created_at,
	Claims.Claim_Number,
	IIF(Claims.DisplayID = 2, 'За маршрутом обхідника', places.Name) AS place_name,
	SUBSTRING(Districts.Name, 1, 5) AS district,
	Claim_types.Full_Name,
	Diameters.Size,
	(
		SELECT
			concat(
				ROW_NUMBER() OVER(
					ORDER BY
						[Orders].[Id]
				),
				') '
			) + concat(
				CONVERT(
					VARCHAR(10),
					CAST(Orders.Created_at AS DATE),
					104
				),
				' ',
				CONVERT(VARCHAR(5), CAST(Orders.Created_at AS TIME), 108)
			) + CHAR(10)
		FROM
			dbo.Orders Orders
		WHERE
			Orders.Claim_ID = Claims.Id FOR XML PATH (''),
			TYPE
	) AS orders,
	Claims.Description,
	(
		SELECT
			Action_types.Name + ' (' + CAST(count(Action_types.Id) AS NVARCHAR(8)) + '); ' + CHAR(13)
		FROM
			dbo.Actions Actions 
			LEFT JOIN dbo.Action_type_Place_type atpt ON atpt.Id = Actions.Action_type_ID
			LEFT JOIN dbo.Action_types Action_types ON Action_types.Id = atpt.Action_type_Id
		WHERE
			Actions.Claim_ID = Claims.Id
			AND Actions.Do_not = 0
		GROUP BY
			Action_types.Name FOR XML PATH (''),
			TYPE
	) AS actions,
	Claims.Claim_class_ID,
	Claims.Status_ID,
	switch_places_name.[name] AS [switch_places_name],
	sequela_comm.comment AS [description_sequela],
	reg_user.[Name] AS user_register,
	IIF(Claims.Status_ID = 5, close_user.[Name], NULL) AS user_close
FROM
	dbo.Claims Claims 
	LEFT JOIN dbo.Organizations org ON org.Id = Claims.Response_organization_ID
	LEFT JOIN dbo.Claim_Order_Places cop ON cop.Claim_ID = Claims.Id
	AND cop.Is_first_place = 1
	LEFT JOIN dbo.Places Places ON Places.Id = cop.Place_ID
	LEFT JOIN dbo.Districts Districts ON Districts.Id = Places.District_ID
	LEFT JOIN dbo.Diameters Diameters ON Diameters.Id = Claims.Diameters_ID
	LEFT JOIN dbo.Claim_types Claim_types ON Claim_types.Id = Claims.Claim_type_ID
	--- registeter by User
	LEFT JOIN (SELECT 
				c.Id claim_Id,
				MIN(ch.Id) min_Id
			   FROM dbo.Claims c
			   LEFT JOIN dbo.Claims_History ch ON ch.Claims_ID = c.Id
			   GROUP BY c.Id) min_history ON min_history.claim_Id = Claims.Id
	LEFT JOIN (SELECT 
				ISNULL(LastName + N' ', '') + ISNULL(FirstName + N' ', '') [Name],
				[UserId],
				ch.Id min_h_id  
			  FROM CRM_AVR_System.dbo.[User] u
			  LEFT JOIN dbo.Claims_History ch ON ch.[User] = u.[UserId] ) reg_user ON reg_user.min_h_id = min_history.min_Id 
	--- closed by User
	LEFT JOIN (SELECT 
				c.Id claim_Id,
				MAX(ch.Id) max_Id
			   FROM dbo.Claims c
			   LEFT JOIN dbo.Claims_History ch ON ch.Claims_ID = c.Id
			   GROUP BY c.Id) max_history ON max_history.claim_Id = Claims.Id
	LEFT JOIN (SELECT 
				ISNULL(LastName + N' ', '') + ISNULL(FirstName + N' ', '') [Name],
				[UserId],
				ch.Id max_h_id  
			  FROM CRM_AVR_System.dbo.[User] u
			  LEFT JOIN dbo.Claims_History ch ON ch.[User] = u.[UserId] ) close_user ON close_user.max_h_id = max_history.max_Id
	LEFT JOIN (
		SELECT
			p1.Claim_ID,
			(
				SELECT
					rtrim(pp.Name) + N';' AS 'data()'
				FROM
					dbo.Claim_SwitchOff_Address p2 
					LEFT JOIN dbo.Places pp ON pp.Id = p2.Place_ID 
				WHERE
					p2.Claim_ID = p1.Claim_ID FOR XML PATH('')
			) AS [name]
		FROM
			dbo.Claim_SwitchOff_Address p1 
		GROUP BY
			p1.Claim_ID
	) AS switch_places_name ON switch_places_name.claim_id = Claims.Id
	LEFT JOIN (
		SELECT
			Claim_ID,
			(
				SELECT
					rtrim([Description]) + N';' AS 'data()'
				FROM
					dbo.Sequela s2
				WHERE
					s2.Claim_ID = s1.Claim_ID FOR XML PATH('') 
			) AS COMMENT
		FROM
			dbo.Sequela s1 
		GROUP BY
			s1.Claim_ID
	) AS sequela_comm ON sequela_comm.Claim_ID = Claims.Id
WHERE
	CONVERT(DATE, Claims.Created_at) >= @date_from
	AND CONVERT(DATE, Claims.Created_at) <= isnull(@date_to, getdate()) 
	AND [Claims].[Response_organization_ID] @OrgID
	AND #filter_columns#
ORDER BY
	Claims.Id;