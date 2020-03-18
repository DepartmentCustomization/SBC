select 0 as col1, N'Всі контакти'  as col2, null as col3,  
null as col4, null as col5, null as col6, null as col7, null as col8
union all
SELECT 
       [Contacts].[Id]
      ,[Contacts].[Name]	
      ,Contact_types.Name as contact_types_name
	  ,concat (
	            case when Districts.Name is null then Districts.Name else Districts.Name + ', ' end,
				case when Streets.Name is null then Streets.Name else Streets.Name +', ' end,
				case when Houses.Name is null then Houses.Name  else Houses.Name+', ' end
	  ) as adress
	  ,concat (
				case when Flats.Number is null then cast(Flats.Number as nvarchar) else N'кв. ' + cast(Flats.Number as nvarchar)+', ' end,
				case when Flats.Letter is null then cast (Flats.Letter as nvarchar) else N'літ.'+ Flats.Letter +', ' end,
				case when Flats.Floor is null then cast (Flats.Floor  as nvarchar)  else N'під.'+ cast (Flats.Floor  as nvarchar)+', ' end,
				case when Flats.Porch is null then cast(Flats.Porch  as nvarchar)  else N'пов.'+ cast (Flats.Porch  as nvarchar) end
	  ) as flats_name
	  ,isnull(cast(tabl_phone.phone_number as nvarchar),'') as Number --Contact_phones.Number
	  ,Organizations.Name as organizations_name
	  ,Jobs.Job_name as job_name
  FROM [dbo].[Contacts]
  left join Contact_types on Contact_types.Id = Contacts.Contact_type_ID
  left join Organizations on Organizations.Id = Contacts.Organisation_ID
  left join Jobs on Jobs.Id = Contacts.Job_ID
  left join Houses on Houses.Id = Contacts.Houses_ID
  left join Streets on Streets.Id = Houses.Street_id
  left join Flats on Flats.Id = Contacts.Flats_ID
  left join Districts on Districts.Id = Houses.District_id
  left join --Contact_phones on Contact_phones.Contact_ID = Contacts.Id
            (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('') 
					) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
WHERE 
 [Contacts].[Name] like '%'+@PIB+'%'
and isnull(cast(tabl_phone.phone_number as nvarchar),'') like '%'+@Phone+'%'
-- and concat (
-- 	            case when Districts.Name is null then Districts.Name else Districts.Name + ', ' end,
-- 				case when Streets.Name is null then Streets.Name else Streets.Name +', ' end,
-- 				case when Houses.Name is null then Houses.Name  else Houses.Name+', ' end
-- 	  ) like '%'+@Adress+'%'