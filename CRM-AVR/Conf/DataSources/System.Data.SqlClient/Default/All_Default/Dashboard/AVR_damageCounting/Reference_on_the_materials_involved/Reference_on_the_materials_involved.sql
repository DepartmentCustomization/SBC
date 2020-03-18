SELECT 
	ROW_NUMBER() over(PARTITION  BY case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end order by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end desc) as num		--(order by (select 1)) as num
	,case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end as is_out
	,Materials.Name as material
	,Diameters.Size
	,Districts.Name as districts
	,Organizations.Name as organizations
	,concat(sum(Action_Materials.Volume),' ',Units.ShortName) as count_volume
--	,sum(Action_Materials.Volume) as count_volume
	,count(distinct Claims.Claim_Number) as count_claims
			,Materials.Id as materials_id
			,Diameters.Id as diameters_id
			,Districts.Id as districts_id
			,Organizations.Id as org_id
	,'Детальніше' as details 
  FROM Claims
	left join Actions on Actions.Claim_ID = Claims.Id
	join Action_Materials on Action_Materials.Action_ID = Actions.Id
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Places on Places.Id = Actions.Place_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
    left join Units on Units.Id = Action_Materials.Units_Id
where Claims.Status_ID in (5,6)
	and Claims.Response_organization_ID = @org_id
	and Claims.Fact_finish_at >= @start_date
	and Claims.Fact_finish_at < @end_date

group by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end, Materials.Name, Diameters.Size, Districts.Name, Organizations.Name
		,Materials.Id, Diameters.Id, Districts.Id, Organizations.Id, Units.ShortName
order by 2 desc


/*SELECT 
	ROW_NUMBER() over(PARTITION  BY case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end order by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end desc) as num		--(order by (select 1)) as num
	,case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end as is_out
	,Materials.Name as material
	,Diameters.Size
	,Districts.Name as districts
	,Organizations.Name as organizations
	,sum(Action_Materials.Volume) as count_volume
	--,Action_Materials.Volume
	--,Actions.Id
	,count(distinct Claims.Claim_Number) as count_claims
	--,Claims.Claim_Number
  FROM Claims
	left join Actions on Actions.Claim_ID = Claims.Id
	join Action_Materials on Action_Materials.Action_ID = Actions.Id
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Places on Places.Id = Actions.Place_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID

where Claims.Status_ID in (5,6)
	and Claims.Response_organization_ID = @org_id
	and Claims.Fact_finish_at >= @start_date
	and Claims.Fact_finish_at < @end_date

group by case when Action_Materials.In_out = 1 then N'Використано'
		else  N'Видобуто' end, Materials.Name, Diameters.Size, Districts.Name, Organizations.Name
	order by 2 desc*/