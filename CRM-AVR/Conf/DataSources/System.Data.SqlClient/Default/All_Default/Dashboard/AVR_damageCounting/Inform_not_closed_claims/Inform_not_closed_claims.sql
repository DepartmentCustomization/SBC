SELECT [Claims].[Id]
      ,row_number() over (order by (select 1)) as num
	  ,Organizations.Name as organizations_name
      ,[Claims].[Claim_Number]
	  ,Claims.Created_at
	  ,Places.Name as places_name
	  ,Claims.Description
	  ,(SELECT distinct rtrim(Action_types.Name) + '; ' 
			FROM [dbo].Actions left join Action_types on Action_types.Id = Actions.Action_type_ID 
			where Claim_ID= [Claims].Id FOR xml path('')
		) as actions_type 
	  ,(select isnull(sum(act.Fact_duration), convert(numeric(18,2), sum(DATEDIFF (minute, act.Start_from, act.Finish_at)*1.00 )/60 )) 
			from Actions as act
			where act.Claim_ID = Claims.Id
		) as "hour_spells"
	  ,(SELECT distinct rtrim(Actions.Comment) + '; ' 
			FROM [dbo].Actions 
			where Claim_ID= [Claims].Id FOR xml path('')
		) as actions_comment 
	  ,(SELECT distinct rtrim(pl2.Name) + '; ' 
			FROM Claim_SwitchOff_Address as sw_off
			left join Places as pl2 on pl2.Id = sw_off.Place_Id 
			where sw_off.Claim_ID= [Claims].Id 
			FOR xml path('')
		) as swich_off,
		Claims.Claim_class_ID
		,Organizations.Id as organizations_id
FROM [dbo].[Claims]
  left join Organizations on Organizations.Id = Response_organization_ID
  left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
  left join Places on Places.Id = Claim_Order_Places.Place_ID
where Organizations.Is_WC = 1 
	and Status_ID in (1,2,3) and Claims.Fact_finish_at is null
	and Claim_Order_Places.Is_first_place = 1
--	and Organizations.Id = @OrgId
--and Claims.Claim_class_ID in (@claim_class)
    and Claims.Created_at > @start_date and Claims.Created_at <= @finish_date
and #filter_columns#