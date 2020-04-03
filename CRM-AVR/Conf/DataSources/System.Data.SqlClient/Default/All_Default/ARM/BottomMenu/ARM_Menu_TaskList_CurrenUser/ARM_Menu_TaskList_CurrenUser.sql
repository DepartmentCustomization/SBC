
SELECT 
	   [Claims].[Id]
	   ,[Claims].[Claim_Number] as ActionsId
	   --,[Claims].First_description
	   ,[Claim_types].Name as Action_typesName
	   ,[Places].Name as PlacesName
	   , N'Заявка №'+rtrim([Claims].[Claim_Number]) as Plan_duration
	   ,case
		when [Claims].Status_ID = 1 and [Claims].[Plan_finish_at] >= getutcdate()  /* or [Claims].[Plan_finish_at] is null and*/  then 'typeOrange'
		when [Claims].Status_ID = 2 and [Claims].[Plan_finish_at] >= getutcdate() /*(getutcdate() <=  [Claims].[Plan_finish_at])  or [Claims].[Plan_finish_at] is null and*/  then 'typeBlue'
	    when [Claims].Status_ID = 3 and [Claims].[Plan_finish_at] >= getutcdate() /*(getutcdate() <=  [Claims].[Plan_finish_at])  or [Claims].[Plan_finish_at] is null and*/  then 'typeGreen'
	    when getutcdate() >= [Claims].[Plan_finish_at] and [Claims].Status_ID in (1,2,3) then 'typeRed'
	    when [Claims].[Plan_finish_at] is null then 'typeBlack'
	    end as WorkStatus
	   ,[Claims].Status_ID
	   ,[Status].Name as StatusName
	   ,case when len([Description]) > 30 then concat(SUBSTRING( [Description],0,30),'...')
	        else [Description] end as Description
      --,[Claims].[Created_at]
	  ,[Claims].[Plan_start_date]
	  ,[Claims].[Plan_finish_at]
	  --,[Actions].[Finish_at]
	  
	  
	   ,[User].UserId
       -- ,[User].Avatar   
        ,NULL as [Avatar]
		,[User].UserId as UserId2 
		,Isnull([User].LastName,'') + ' ' +Isnull([User].FirstName,'')	 as [JobSystem]
		,N'ispoln' as Typeee
		 ,[Claim_types].Name+' ('+N'Заявка №'+rtrim([Claims].[Claim_Number])+') '+[Claims].Description as [ClaimText]
	  ,case
		when (getutcdate() <  [Claims].[Plan_finish_at])  or [Claims].[Plan_finish_at] is null and [Claims].Status_ID = 1 then 'orange-label'
		when (getutcdate() <  [Claims].[Plan_finish_at])  or [Claims].[Plan_finish_at] is null and [Claims].Status_ID in (2,3) then 'green-label'
	    when getutcdate() >= [Claims].[Plan_finish_at] and [Claims].Status_ID in (1,2,3) then 'red-label'  end as WorkStatus_Label
    ,Organizations.Name as organizations_name
  FROM [dbo].[Claims] 
--  left join  [dbo].[Actions] on [Claims].Id = [Actions].Claim_ID 
  left join  [dbo].[Claim_Order_Places] on [Claim_Order_Places].Claim_ID = [Claims].Id and  [Claim_Order_Places].Is_first_place = 1
  left join [dbo].[Places] on [Places].Id = [Claim_Order_Places].Place_ID
 left join [dbo].[Status] on [Status].Id = [Claims].Status_ID and [Status].Object = N'Claim'
 left join [dbo].[Claim_types] on [Claim_types].Id = [Claims].Claim_type_ID
 left join [CRM_AVR_System].[dbo].[User] on [User].UserId = '29796543-b903-48a6-9399-4840f6eac396'
 left join [Organizations] on [Organizations].Id = Claims.Response_organization_ID
 where [Claims].Status_ID in (1,2,3) and Claims.Response_organization_ID @OrdID
order by [Claims].Created_at

/*

SELECT 
	   [Actions].[Id]
	   ,[Actions].[Id] as ActionsId
	   --,[Claims].First_description
	   ,[Action_types].Name as Action_typesName
	   ,[Places].Name as PlacesName
	   ,cast([Actions].[Plan_duration] as int) as Plan_duration
	   ,case
		when (getutcdate() < dateadd(HOUR,isnull([Actions].[Plan_duration],0), [Actions].[Start_from])  or dateadd(HOUR,isnull([Actions].[Plan_duration],0), [Actions].[Start_from]) is null) and [Claims].Status_ID = 1 then 'typeOrange'
		when (getutcdate() < dateadd(HOUR,isnull([Actions].[Plan_duration],0), [Actions].[Start_from])  or dateadd(HOUR,isnull([Actions].[Plan_duration],0), [Actions].[Start_from]) is null) and [Claims].Status_ID in (2,3) then 'typeGreen'
	    when getutcdate() >= dateadd(HOUR,isnull([Actions].[Plan_duration],0), [Actions].[Start_from]) and [Claims].Status_ID in (1,2,3) then 'typeRed'  end as WorkStatus
	   ,[Claims].Status_ID
	   ,[Status].Name as StatusName
	   ,[Claims].Description
      ,[Actions].[Start_from]
	  ,[Actions].[Plan_start_date]
	  --,[Actions].[Finish_at]
	  
	  
	   ,[User].UserId
        ,[User].Avatar   
		,[User].UserId as UserId2 
		,Isnull([User].LastName,'') + ' ' +Isnull([User].FirstName,'')	 as [JobSystem]
		,N'ispoln' as Typeee
		
  FROM [dbo].[Actions]
  left join [dbo].[Places] on [Places].Id = [Actions].Place_ID
 left join [dbo].[Claims] on [Claims].Id = [Actions].Claim_ID 
 left join [dbo].[Status] on [Status].Id = [Claims].Status_ID and [Status].Object = N'Claim'
 left join [dbo].[Action_types] on [Action_types].Id = [Actions].Action_type_ID
 left join [CRM_AVR_System].[dbo].[User] on [User].UserId = '29796543-b903-48a6-9399-4840f6eac396'
 where [Claims].Status_ID in (1,2,3)
order by [Actions].Start_from

*/