-- DECLARE @Id INT = 9132;

SELECT
  om.[Id],
  o.[Name] AS company_name,
  cont.[Name] AS fiz_name,
  om.[Call_from],
  om.[Plan_date],
  om.[Finish_at],
  om.[Comment],
  om.[Claims_ID]
FROM
  dbo.[OutsideMen] om
  LEFT JOIN dbo.[Contacts] cont ON cont.Id = om.Contact_ID
  LEFT JOIN dbo.[Claims] claim ON claim.Id = om.Claims_ID
  LEFT JOIN dbo.[Organizations] o ON o.Id = om.Company_Contact_ID
  LEFT JOIN dbo.[Contact_types] ct ON ct.Id = om.Contact_type_ID
WHERE
  om.[Claims_ID] = @Id
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;