SELECT DISTINCT
  om.[Id],
  o.[Name] AS company_name,
  cont.[Name] AS fiz_name,
  om.[Call_from],
  om.[Plan_date],
  om.[Finish_at],
  om.[Comment],
  om.[Claims_ID],
  (
		SELECT
			TOP(1) [Number]
		FROM
			dbo.Contact_phones cp
 		WHERE
			cp.Contact_ID = cont.Id
	) AS Phone,
  case when OutsideMen_Documents.[Id] is not null then N'Так' else N'Ні' end has_docs
FROM
  dbo.[OutsideMen] om
  LEFT JOIN dbo.[Contacts] cont ON cont.Id = om.Contact_ID
  LEFT JOIN dbo.[Claims] claim ON claim.Id = om.Claims_ID
  LEFT JOIN dbo.[Organizations] o ON o.Id = om.Company_Contact_ID
  LEFT JOIN dbo.[Contact_types] ct ON ct.Id = om.Contact_type_ID
  LEFT JOIN [dbo].[OutsideMen_Documents] on OutsideMen_Documents.OutsideMen_Id = om.Id
WHERE
  om.[Claims_ID] = @claim_id 
