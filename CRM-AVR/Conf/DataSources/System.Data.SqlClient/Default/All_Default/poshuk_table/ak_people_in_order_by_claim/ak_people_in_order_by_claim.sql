select a.* from
(
SELECT 
DISTINCT
       oj.[Id]
	  ,c.[Name] AS contacts_name
	  ,j.Job_name AS jobs_name
	  ,ISNULL(org.Short_name, 'Не вказано') AS org_name
	  ,case when oj.[Is_main] = 1 then N'Так' else N'Ні' end Is_main
	  ,case when oj.[Is_driver] = 1 then N'Так' else N'Ні' end Is_driver
	  ,CAST(tabl_phone.phone_number AS NVARCHAR) AS Number
	  ,RANK() OVER(ORDER BY ord.Id ASC)  Order_Number
  FROM [dbo].[Order_Jobs] oj
	LEFT JOIN Orders ord ON ord.Id = oj.[Order_id]
	LEFT JOIN Jobs j  ON j.Id = oj.Job_ID
	LEFT JOIN Contacts c ON c.Id = j.Contacts_ID
	LEFT JOIN Organizations org ON org.Id = j.Organization_ID
	LEFT JOIN 
            (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('') 
					) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = c.Id

WHERE ord.Claim_ID = @claim_id
) a
ORDER BY 
	Order_Number,
    Is_main DESC, 
    contacts_name
