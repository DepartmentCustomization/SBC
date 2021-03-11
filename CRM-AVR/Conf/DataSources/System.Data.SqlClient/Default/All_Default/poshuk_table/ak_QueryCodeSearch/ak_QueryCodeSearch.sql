declare @registration_date_fromP nvarchar(200)=
 case when @registration_date_from is not null 
 then N' and claims.created_at>= '''+format(convert(datetime2, @registration_date_from), 'yyyy-MM-dd HH:mm:00')+N'.000'''
 else N'' end;

 declare @registration_date_toP nvarchar(200)=
 case when @registration_date_to is not null 
 then N' and claims.created_at<= '''+format(convert(datetime2, @registration_date_to), 'yyyy-MM-dd HH:mm:59')+N'.999'''
 else N'' end;

 declare @closed_date_fromP nvarchar(200)=
 case when @closed_date_from is not null 
 then N' and claims.Fact_finish_at>= '''+format(convert(datetime2, @closed_date_from), 'yyyy-MM-dd HH:mm:00')+N'.000'''
 else N'' end;

 declare @closed_date_toP nvarchar(200)=
 case when @closed_date_to is not null 
 then N' and claims.Fact_finish_at<= '''+format(convert(datetime2, @closed_date_to), 'yyyy-MM-dd HH:mm:59')+N'.999'''
 else N'' end;


declare @param_new nvarchar(max) 
set @param_new = @param1 

set @param_new = Replace(@param_new,'diameter','[Claims].[Diameters_ID]')
set @param_new = Replace(@param_new,'claim_type','[Claim_types].Id')
set @param_new = Replace(@param_new,'claim_class','[Claim_classes].Id')
set @param_new = Replace(@param_new,'response_org','[Organizations].Id')
set @param_new = Replace(@param_new,'main_place_type','[Place_types].Id')
set @param_new = Replace(@param_new,'main_place_district','[Districts].Id')
set @param_new = Replace(@param_new,'main_place','[Places].Id')
set @param_new = Replace(@param_new,'flat','[Flats].Number')
set @param_new = Replace(@param_new,'priority','claims.[Priority]')
set @param_new = Replace(@param_new,'claim_is_not_balans','claims.[not_balans]')
set @param_new = Replace(@param_new,'main_action_type','[Action_types].Id')

set @param_new = Replace(@param_new,'faucet_actions_type','[Faucet].[Action_types_Id]')
set @param_new = Replace(@param_new,'faucet_diametr','[Faucet].[Diametr_Id]')
--[Action_types_Id] Diametr_Id --faucet_diametr

set @param_new = N''+Replace(@param_new,'in (-1)','is null')
set @param2 = N''+Replace(@param2,' and ',' or ')

declare @query nvarchar(max)=
N'SELECT DISTINCT [Claims].[Id]
      ,[Claim_Number]
	  ,Claims.created_at as claim_created_at
	  ,isnull(u.Firstname,'''')+isnull(N'' '' + u.Patronymic,'''') +isnull(N'' '' + u.LastName,'''') + isnull(N'' ('' + uio.JobTitle + N'')'','''') as User_Created_By 
    ,isnull(u_closed.Firstname,'''')+isnull(N'' '' + u_closed.Patronymic,'''') +isnull(N'' '' + u_closed.LastName,'''') + isnull(N'' ('' + uio_closed.JobTitle + N'')'','''') as User_Closed_By 
	  ,[Claims].Plan_start_date
	  ,[Claims].Plan_finish_at
	  ,[Claims].[Fact_finish_at] claim_finish_at
    ,Claim_classes.Name Claim_class_name
    ,Claim_types.Full_Name claim_type_name
    ,Diameters.Size Diameter_size
	  ,Places.Name Main_Place_Name
	  ,[Organizations].Short_Name Response_Org_Name
	  ,Districts.Name Main_District_Name
	  ,Place_types.Name Main_Place_Type_Name
	  ,Flats.Number Flats_Name
	  ,case when claims.[Priority] = 1 then N''1 (Важливо)'' 
          when claims.[Priority] = 2 then N''2 (Загально)'' 
          when claims.[Priority] = 3 then N''3 (Планування)'' 
          else N''''+convert(nvarchar(20),claims.[Priority])
    end claim_Priority
	  ,claims.[not_balans] claim_is_not_balans
	  ,claims.Description claim_Description
	  ,[Action_types].[Name] main_action_type
    
    ,[Claim_content].Sked 
    ,[Claim_content].[TU]
    ,Claim_content.[TU_Id]
    ,Claim_content.[Letter]
    ,Claim_content.L_Contacts_Id
    ,Claim_content.Gravamen
    ,case when Claim_content.G_Left = N''L'' then N''Лист''
          when Claim_content.G_Left = N''E'' then N''E-mail''
          when Claim_content.G_Left = N''F'' then N''Facebook''
          when Claim_content.G_Left = N''T'' then N''Телефон''
    end G_Left
    ,Claim_content.[G_PIB]
    -- ,cont_ex.Name Executor_Name

    -- ,isnull([Contact_types].Name,N''Анонім'') Contact_Type_Name

  FROM [Claims]
  left join Claim_classes on Claim_classes.Id = [Claim_class_ID]
  left join Claim_types on Claim_types.Id = [Claims].[Claim_type_ID]
  left join Diameters on Diameters.Id = [Claims].[Diameters_ID] 
  left join [Claim_Order_Places] on [Claim_Order_Places].Claim_id = [Claims].Id and [Claim_Order_Places].Is_first_place = 1
  left join [Places] on [Places].Id = [Claim_Order_Places].Place_Id
  left join [Place_types] on [Place_types].Id = [Places].Place_type_Id
  left join [Districts] on [Districts].Id = [Places].[District_ID]
  left join [Flats] on [Flats].Id = [Claim_Order_Places].[Flats_ID]
  left join [Organizations] on [Organizations].Id = [Claims].Response_Organization_ID

  -- to do
  left join (select Claims_Id, MIN(id) ch_id from [Claims_History] group by Claims_Id) ch_created_by on ch_created_by.Claims_Id = [Claims].Id
  left join [Claims_History] on [Claims_History].Id = ch_created_by.ch_id
  left join [CRM_AVR_System].[dbo].[User] u on u.UserId = [Claims_History].[User]
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_min on uio_min.UserId = [Claims_History].[User]
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio on uio.Id  = uio_min.uio_id
  
  left join [Actions] on [Actions].Claim_id = Claims.Id and [Actions].[Is_Goal] = 1
  left join [Action_types] on [Action_types].Id = [Actions].[Action_type_ID]

  -- to do
  left join (select Claims_Id, MAX(id) ch_id from [Claims_History] where [Field] = N''Статус'' and [New_Value] = ''Закрита'' group by Claims_Id) ch_closed_by on ch_closed_by.Claims_Id = [Claims].Id
  left join [Claims_History] Claims_History_Closed_By on Claims_History_Closed_By.Id = ch_closed_by.ch_id
  left join [CRM_AVR_System].[dbo].[User] u_closed on u_closed.UserId = Claims_History_Closed_By.[User]
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_closed_min on uio_closed_min.UserId = Claims_History_Closed_By.[User]
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio_closed on uio_closed.Id  = uio_closed_min.uio_id

  left join [Claim_content] on [Claim_content].[Claim_Id] = [Claims].Id
  left join [Faucet] on [Faucet].[Claim_Id] = [Claims].Id 
  left join [Orders] on [Orders].Claim_id = Claims.Id
  left join [Order_Jobs] ON Orders.Id = Order_Jobs.[Order_id] 
  left join [Moves] on Moves.Orders_Id = Orders.Id
  left join [Claim_SwitchOff_Address] on [Claim_SwitchOff_Address].Claim_Id = [Claims].Id
  left join [Disabling_debtors] on Disabling_debtors.[Claim_ID] = [Claims].Id
  left join [OutsideMen] on [OutsideMen].[Claims_ID] = [Claims].Id
  left join [Actions] [Actions_All] on [Actions_All].Claim_id = Claims.Id
  left join [Action_Materials] on Action_Materials.Action_ID = Actions_All.Id
  left join [Sequela] on [Sequela].Claim_ID = [Claims].Id

  where ' 
+ @param_new 
+ @registration_date_fromP + @registration_date_toP
+ @closed_date_fromP + @closed_date_toP
+''





declare @filter1 nvarchar(max) = 
'declare @t table
(
  subjects int,
  code nvarchar(100),
  name nvarchar(100)
)


insert into @t (subjects, name)
   select 1 as ID, N''Виїзди'' Name
   union
   select 2 as ID, N''Бригади у виїздах''
   union
   select 3 as ID, N''Техніка у виїздах''  
   union
   select 4 as ID, N''Запірна арматура''  
   union
   select 5 as ID, N''Відключення''
   union
   select 6 as ID, N''Відключення боржників''
   union
   select 7 as ID, N''Виклик спецслужб''
   union
   select 8 as ID, N''Роботи''
   union
   select 9 as ID, N''Матеріали у роботах''
   union
   select 10 as ID, N''Ускладнення по роботі'''

declare @filter nvarchar(max) = 
@filter1 + 
'
select subject_include, name, subject_exclude
from
(
select subjects subject_include, name, 0 subject_exclude from @t
union 
select 0, name, subjects from @t
) table_1

where '+@param2+'
'

declare @t2 table
(
  subject_include int,
  name nvarchar(100),
  subject_exclude int
)

insert into @t2 (subject_include, name, subject_exclude)
exec(@filter)


-- delete from @t2 where subject_include <> 0
-- and subject_exclude <> 0 and subject_include<>subject_exclude

if (exists(select * from @t2 a inner join @t2 b on b.subject_exclude = a.subject_include))
    set @param2 = '1=0'
else 
begin  
    delete from @t2 where subject_include <> 0
    and subject_include in (select subject_exclude from @t2 where subject_exclude <> 0)

    if (@param2 = '1=1') delete from @t2 
end 

-- ---

if (exists (select subject_include from @t2 where subject_include = 4))
set @query = replace(@query,N'left join [Faucet]',N'inner join [Faucet]')

if (exists (select subject_include from @t2 where subject_include = 1))
set @query = replace(@query,N'left join [Orders]',N'inner join [Orders]')

if (exists (select subject_include from @t2 where subject_include = 2))
set @query = replace(@query,N'left join [Order_Jobs]',N'inner join [Order_Jobs]')

if (exists (select subject_include from @t2 where subject_include = 3))
set @query = replace(@query,N'left join [Moves]',N'inner join [Moves]')

if (exists (select subject_include from @t2 where subject_include = 5))
set @query = replace(@query,N'left join [Claim_SwitchOff_Address]',N'inner join [Claim_SwitchOff_Address]')

if (exists (select subject_include from @t2 where subject_include = 6))
set @query = replace(@query,N'left join [Disabling_debtors]',N'inner join [Disabling_debtors]')

if (exists (select subject_include from @t2 where subject_include = 7))
set @query = replace(@query,N'left join [OutsideMen]',N'inner join [OutsideMen]')

if (exists (select subject_include from @t2 where subject_include = 8))
set @query = replace(@query,N'left join [Actions_All]',N'inner join [Actions_All]')

if (exists (select subject_include from @t2 where subject_include = 9))
set @query = replace(@query,N'left join [Action_Materials]',N'inner join [Action_Materials]')

if (exists (select subject_include from @t2 where subject_include = 10))
set @query = replace(@query,N'left join [Sequela]',N'inner join [Sequela]')




if (exists (select subject_exclude from @t2 where subject_exclude = 4))
set @query = @query + ' and [Faucet].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 1))
set @query = @query + ' and [Orders].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 2))
set @query = @query + ' and [Order_Jobs].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 3))
set @query = @query + ' and [Moves].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 5))
set @query = @query + ' and [Claim_SwitchOff_Address].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 6))
set @query = @query + ' and [Disabling_debtors].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 7))
set @query = @query + ' and [OutsideMen].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 8))
set @query = @query + ' and [Actions_All].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 9))
set @query = @query + ' and [Action_Materials].Id is null'

if (exists (select subject_exclude from @t2 where subject_exclude = 10))
set @query = @query + ' and [Sequela].Id is null'

-- Diameters
-- set @query = replace(@query,N'left join [Faucet]',N'inner join [Faucet]')
-- applicants
-- avr_ClaimsSelectRow
-- to do


declare @query_for_applicant nvarchar(max)
set @query_for_applicant = 
'-- DECLARE @Id INT = 269;

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
	AND Claim_Order_Places.Is_first_place <> 0 ;'



set @query_for_applicant = 
	'select DISTINCT Id as Claim_Id,
  case when contact_type = 1 then N''Абонент- фіз. особа''
       when contact_type = 2 then N''Абонент- юр. особа''
       when contact_type = 3 then N''Співробітник''
       else N''Анонім'' end contact_type_name, 
  case when contact_type = 1 then FIZ_contact_fio
       when contact_type = 2 then UR_contact_fio
       when contact_type = 3 then EM_contact_fio_name
       end Contact_Name,
  case when contact_type = 1 then FIZ_number
       when contact_type = 2 then UR_number
       when contact_type = 3 then EM_number
       end contact_phone,
  case 
       when contact_type = 2 then UR_organization_name
       -- when contact_type = 3 then EM_org_name
       end Contact_Org,
  case 
       when type_employee_2 = 5 then N''ДЕВГ''
       when type_employee_2 = 6 then N''ДЕКГ''
       when type_employee_2 = 8 then N''РД''
       when type_employee_2 = 15 then N''ДЕН''
       when type_employee_2 = 1 then N''Керівництво''
       end Contact_Department,
  case 
       when contact_type = 2 then UR_organization
       when contact_type = 3 then EM_org_name
       end Contact_Sub_Department
       
	from (' +
	REPLACE(REPLACE(REPLACE(REPLACE(@query_for_applicant, 'WHERE
	[Claims].[Id] = @Id', ''),'@Id','-1'),'#system_database_name#','CRM_AVR_System'),';','')
	+') t '


--exec(@query_for_applicant)

set @query = 'select * from (' + @query + ') aa left join (' + @query_for_applicant + ') bb on aa.Id = bb.Claim_Id order by aa.Id'



exec(@query)