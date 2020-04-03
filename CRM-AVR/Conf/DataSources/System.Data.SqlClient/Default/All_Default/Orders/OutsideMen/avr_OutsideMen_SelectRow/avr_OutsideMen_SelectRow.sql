-- DECLARE @Id INT = 55;

SELECT
   om.[Id],
   om.[Call_from],
   om.[Plan_date],
   om.[Finish_at],
   om.[Comment],
   o.[Name] AS company_name,
   o.Id AS company_id,
   c.Id AS fiz_id,
   c.[Name] AS fiz_name,
   om.[Claims_ID],
   cl.Status_ID AS claim_stat_id,
   dbo.f_phone_number_outsideMan(om.Company_Contact_ID) AS contact_number
FROM
   dbo.[OutsideMen] om
   LEFT JOIN dbo.Contacts c ON c.Id = om.Contact_ID
   LEFT JOIN dbo.Claims cl ON cl.Id = om.Claims_ID
   LEFT JOIN dbo.Organizations o ON o.Id = om.Company_Contact_ID
   LEFT JOIN dbo.Contact_types ct ON ct.Id = om.Contact_type_ID
WHERE
   om.[Id] = @Id ;