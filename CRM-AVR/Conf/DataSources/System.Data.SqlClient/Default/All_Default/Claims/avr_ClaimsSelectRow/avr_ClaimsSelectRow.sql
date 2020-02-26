--  DECLARE @Id INT = 9091;

 DECLARE @CreatorName NVARCHAR(200) = (SELECT 
											ISNULL(LastName + N' ','') + 
                                            ISNULL(FirstName + N' ','') + 
											ISNULL(Patronymic,'') 
										FROM CRM_AVR_System.dbo.[User] 
										WHERE UserID = (SELECT 
										                     [User] 
														FROM dbo.Claims 
														WHERE Id = @Id));
SELECT  
DISTINCT
[Claims].[Id]
    ,ct.Id as FIZ_concact_id 
	,ct.Name as  FIZ_contact_fio
	,(select top(1) number from Contact_phones cp where  cp.Contact_ID = ct.Id) as FIZ_number
    ,isnull(ct.Contact_type_ID,ct2.Contact_type_ID) as contact_type

	,ct.Id as EM_contact_fio
	,ct.Name as EM_contact_fio_name
-- 	,Jobs.Organization_ID as EM_org_id
	,isnull(Jobs.Organization_ID,ct2.Id) as EM_org_id
	--,ct.Id as EM_org_id
	,(select org.Name from Organizations org where Jobs.Organization_ID =  org.Id ) as EM_org_name
    ,(select top(1) number from Contact_phones cp where  cp.Contact_ID = ct.Id) as EM_number

	,ct.Id as UR_organization_id
	,ct.Name as UR_organization_name
	,ct2.Id as UR_contact_fio 
	,ct2.Name as UR_contact_fio_name 
    ,UR_phone.Id as UR_number
	,UR_phone.Number as UR_number_phone
    ,case 
		when isnull(Jobs.Organization_ID,ct2.Id) between 5000 and 5999 then 5
		when isnull(Jobs.Organization_ID,ct2.Id) between 6000 and 6999 then 6
		when isnull(Jobs.Organization_ID,ct2.Id) between 8000 and 8999 then 8
		when isnull(Jobs.Organization_ID,ct2.Id) between 15000 and 15999 then 15
		else isnull(Jobs.Organization_ID,ct2.Id) 
	end as type_employee_2
	, @CreatorName as [User]
	,(SELECT [Job_name]  FROM [dbo].[Jobs] where  [Login] = (SELECT 
										                     [User] 
														FROM dbo.Claims 
														WHERE Id = @Id)
	  ) as position_reg
      ,[Claims].[Id] as claims_id
      ,[Claims].[Claim_Number]
	  ,[Claim_classes].[Name] as classes_name
		,[Claim_classes].[Id] as classes_id
	  ,[Status].[Name] as status_name
		,[Status].[Id] as status_id
	  ,[first_type].[Name] as first_types_name
		,[first_type].[Id] as first_types_id
	  ,[Claim_types].[Full_Name] as types_name
		,[Claim_types].[Id] as types_id
      ,[Claims].[Created_at]
	  ,[Organizations].[Name] as organization_name
		,[Organizations].[Id] as organization_id
      ,[Claims].[Plan_start_date]
      ,[Claims].[Plan_finish_at]
      ,[Claims].[First_description]
      ,[Claims].[Description]
      ,[Claims].[Priority]
      ,[Claims].[Report_action_id]
	  ,Claims.Fact_finish_at
	  ,Places.Name as places_name
		,Places.Id as places_id
	   ,Place_types.Name as place_type_name
        ,Place_types.Id as place_type_id
	  ,Diameters.Size
		,Diameters.Id as Diameters_ID
	,isnull((select count(Id) from Orders where Orders.Claim_ID = @Id),0) as count_orders
	,Claims.Is_Template

    ,Flats.[Number] as flat_number
	,Districts.Name as district_name
		,Districts.Id as district_id
--	,'тимчасово не доступно' as mereja
    ,Jobs.Job_name
    , null as is_Zasuv
    ,(SELECT Surname  +' '+ First_name from Contacts where Job_ID =  (select id from Jobs where [Login] = (select top 1 Claims_History.[User] from Claims left join Claims_History on Claims_History.Claims_ID = Claims.Id
	    where Claims.id = @Id order by Claims_History.Id desc ))
	) as user_close
	    ,(SELECT [Job_name]  FROM [dbo].[Jobs] where  [Login] = 
		( select top 1 Claims_History.[User] from Claims left join Claims_History on Claims_History.Claims_ID = Claims.Id
	    where Claims.id = @Id order by Claims_History.Id desc )
	  ) as position_close
	,( select top 1 Claims_History.[Date] from Claims left join Claims_History on Claims_History.Claims_ID = Claims.Id
	    where Claims.id = @Id order by Claims_History.Id desc ) as date_close
	,Houses.Street_id
	,Claims.date_check
	,Claims.not_balans
	  ,Claim_content.Sked
      ,Claim_content.[TU]
      ,Claim_content.[TU_Id]
      ,Claim_content.[Letter]
      ,Claim_content.[L_Contacts_Id]
      ,Claim_content.[Gravamen]
      ,Claim_content.[G_Left]
      ,Claim_content.[G_PIB]
      ,ct3.Name as x_pib_inspector_name
      ,ct3.Id as x_pib_inspector
    --   ,Claim_content.Contact_insp_phone as x_phone_inspector
      ,(select top 1 Number from Contact_phones where Contact_ID = ct3.Id) as x_phone_inspector
      ,Claim_classes.PriorityType
  FROM [dbo].[Claims]
	LEFT JOIN [dbo].[Status] on [Status].[Id] = [Claims].[Status_ID]
	LEFT JOIN [dbo].[Claim_classes] on [Claim_classes].[Id] = [Claims].[Claim_class_ID]
	LEFT JOIN [dbo].[Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Claim_types] as first_type on [first_type].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
	left join Places on Places.Id = Claim_Order_Places.Place_ID
	left join Houses on Houses.Id = Places.Street_id

    left join Contacts as ct on ct.Id = Claims.Contact_ID
	left join Contacts as ct2 on ct2.Id = Claims.Contact_ID_Fiz
	left join Contact_types on Contact_types.Id = ct.Contact_type_ID
	left join Contact_types as Contact_types2 on Contact_types2.Id = ct2.Contact_type_ID
    left join Jobs on Jobs.Contacts_ID = ct.external_Id
	left join Organizations org_jobs on org_jobs.Id = jobs.Organization_ID

	left join Contact_phones UR_phone on UR_phone.Contact_ID = ct2.Id 

	left join Diameters on Diameters.Id = Claims.Diameters_ID
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Claim_content on Claim_content.Claim_Id = Claims.Id
	left join Contacts as ct3 on ct3.Id = Claim_content.Contact_insp_PIB
WHERE [Claims].[Id] = @Id and Claim_Order_Places.Is_first_place <> 0