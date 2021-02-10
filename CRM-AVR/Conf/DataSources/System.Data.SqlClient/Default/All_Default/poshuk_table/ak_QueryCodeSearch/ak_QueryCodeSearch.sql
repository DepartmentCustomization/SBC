declare @registration_date_fromP nvarchar(200)=
 case when @registration_date_from is not null 
 then N' and claims.created_at>= '''+format(convert(datetime2, @registration_date_from), 'yyyy-MM-dd HH:mm:00')+N'.000'''
 else N'' end;

 declare @registration_date_toP nvarchar(200)=
 case when @registration_date_to is not null 
 then N' and claims.created_at<= '''+format(convert(datetime2, @registration_date_to), 'yyyy-MM-dd HH:mm:59')+N'.999'''
 else N'' end;


declare @param_new nvarchar(max) 
set @param_new = @param1 collate Ukrainian_CI_AS

set @param_new = Replace(@param_new,'diameter','[Diameters_ID]')
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


set @param_new = N''+Replace(@param_new,'in (-1)','is null')


declare @query nvarchar(max)=
N'SELECT [Claims].[Id]
      ,[Claim_Number]
	  ,Claims.created_at as claim_created_at
	  ,isnull(u.Firstname,'''')+N'' ''+isnull(u.Patronymic,'''') +N'' ''+isnull(u.LastName,'''') +N'' '' + isnull(uio.JobTitle,'''') as User_Created_By 
	  ,isnull(u_closed.Firstname,'''')+N'' ''+isnull(u_closed.Patronymic,'''') +N'' ''+isnull(u_closed.LastName,'''') +N'' '' + isnull(uio_closed.JobTitle,'''') as User_Closed_By 
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

	  ,claims.[Priority] claim_Priority
	  ,claims.[not_balans] claim_is_not_balans
	  ,claims.Description claim_Description
	  ,[Action_types].[Name] main_action_type
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
  left join (select Claims_Id, MIN(id) ch_id from [Claims_History] group by Claims_Id) ch_created_by on ch_created_by.Claims_Id = [Claims].Id
  left join [Claims_History] on [Claims_History].Id = ch_created_by.ch_id
  left join [CRM_AVR_System].[dbo].[User] u on u.UserId = [Claims_History].[User]
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_min on uio_min.UserId = [Claims_History].[User]
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio on uio.Id  = uio_min.uio_id
  left join [Actions] on [Actions].Claim_id = Claims.Id and [Actions].[Is_Goal] = 1
  left join [Action_types] on [Action_types].Id = [Actions].[Action_type_ID]

  left join (select Claims_Id, MAX(id) ch_id from [Claims_History] where [Field] = N''Статус'' and [New_Value] = ''Закрита'' group by Claims_Id) ch_closed_by on ch_closed_by.Claims_Id = [Claims].Id
  left join [Claims_History] Claims_History_Closed_By on Claims_History_Closed_By.Id = ch_closed_by.ch_id
  left join [CRM_AVR_System].[dbo].[User] u_closed on u_closed.UserId = Claims_History_Closed_By.[User]
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_closed_min on uio_closed_min.UserId = Claims_History_Closed_By.[User]
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio_closed on uio_closed.Id  = uio_closed_min.uio_id

  where ' 
+ @param_new + @registration_date_fromP + @registration_date_toP
+'
order by [Claim_Number]'
exec(@query)