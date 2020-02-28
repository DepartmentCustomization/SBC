SELECT 
	ROW_NUMBER() over(PARTITION  BY case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end order by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end desc) as num	
			,Materials.Name as material
			,Diameters.Size
			,Districts.Name as districts
			,Organizations.Name as organizations
			
			,Materials.Id as materials_id			
			,Diameters.Id as diameters_id
			,Districts.Id as districts_id			
			,Organizations.Id as org_id			
	,case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end as is_out
	,Claims.Claim_Number as count_claims
	,Orders.Id as orders_id
	,Actions.Start_from
	,Places.Name as places_name
	,concat( Action_Materials.Volume,' ', Units.ShortName) as volume
--	,Action_Materials.Volume  as volume
	,Action_types.Name
	,Claims.Id as claims_id
FROM Action_Materials
	left join Actions on Actions.Id = Action_Materials.Action_ID
	left join Orders on Orders.Id = Actions.Order_ID
	left join Claims on Claims.Id = Actions.Claim_ID
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Places on Places.Id = Actions.Place_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
	left join Action_types on Action_types.Id = Actions.Action_type_ID
	left join Units on Units.Id = Action_Materials.Units_Id
where Claims.Status_ID in (5,6)
    and Claims.Fact_finish_at >= @start_date
	and Claims.Fact_finish_at < @end_date
	and Action_Materials.Material_ID = @mater
	and Action_Materials.Size = @size
	and Places.District_ID = @distr
	and Claims.Response_organization_ID = @org_id
	or 
	Claims.Status_ID in (5,6)
	and Claims.Fact_finish_at >= @start_date
	and Claims.Fact_finish_at < @end_date
	and Action_Materials.Material_ID = @mater
	and Claims.Response_organization_ID = @org_id
	

order by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end desc